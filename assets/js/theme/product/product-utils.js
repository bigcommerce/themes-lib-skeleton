import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';
import Tabs from 'bc-tabs';

export default class ProductUtils {
  constructor(el, options) {
    this.$el = $(el);
    this.productId = this.$el.find('[data-product-id]').val();
    this.$productMessage = this.$el.find('[data-product-message]');

    this.options = $.extend({
      tabSelector: '.tab-link',
      buttonDisabledClass: 'button-disabled',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
      switchImage: () => console.log('Image switch attempted.'),
    }, options.callbacks);

    this.tabs = new Tabs({
      moduleSelector: this.$el.find('[data-tabs]')
    });

    this._bindEvents();
  }

  _bindEvents() {
    this.$el.on('click', this.options.tabSelector, (event) => {
      event.preventDefault();
      this.tabs.displayTabContent($(event.currentTarget).attr('href'));
    });

    this.$el.on('click', '[data-product-quantity-change]', (event) => {
      this._updateQuantity(event);
    });
  }

  _getViewModel($el) {
    return {
      $price: $('[data-product-price]', $el),
      $rrp: $('[data-product-rrp]', $el),
      $addToCart: $('[data-button-purchase]', $el),
    }
  }

  init(context) {
    this.context = context;

    this._productOptions();
    this._addProductToCart();
  }

  _updateQuantity(event) {
    const $target = $(event.currentTarget);
    const $quantity = $target.closest('[data-product-quantity]').find('[data-product-quantity-input]');
    const min = parseInt($quantity.prop('min'), 10);
    const max = parseInt($quantity.prop('max'), 10);
    let newQuantity = parseInt($quantity.val(), 10);

    this.$productMessage.empty();

    if ($target.is('[data-quantity-increment]') && (!max || newQuantity < max)) {
      newQuantity = newQuantity + 1;
    } else if ($target.is('[data-quantity-decrement]') && newQuantity > min) {
      newQuantity = newQuantity - 1;
    }

    $quantity.val(newQuantity);
  }

  /**
   *
   * Handle product options changes
   *
   */
  _productOptions() {
    utils.hooks.on('product-option-change', (event, changedOption) => {
      const $changedOption = $(changedOption);
      const $form = $changedOption.parents('form');

      // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
      if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
        return;
      }

      utils.api.productAttributes.optionChange(this.productId, $form.serialize(), (err, response) => {
        const viewModel = this._getViewModel(this.$el);
        const data = response ? response.data : {};

        viewModel.$price.html(data.price);
        viewModel.$rrp.html(data.rrp);

        if (data.image) {
          const mainImageUrl = utils.tools.image.getSrc(
            data.image.data,
            this.context.themeImageSizes.product
          );

          this.callbacks.switchImage(mainImageUrl);
        }

        this.$productMessage.empty();

        if (!data.purchasable || !data.instock) {
          viewModel.$addToCart
            .val(this.context.soldOut)
            .addClass(this.options.buttonDisabledClass)
            .prop('disabled', true);

        } else {
          let buttonText = this.context.addToCart;
          if (viewModel.$addToCart.is('[data-button-preorder]')) {
            buttonText = this.context.preOrder;
          }

          viewModel.$addToCart
            .val(buttonText)
            .removeClass(this.options.buttonDisabledClass)
            .prop('disabled', false);
        }
      });
    });
  }

  /**
   *
   * Add a product to cart
   *
   */
  _addProductToCart() {
    utils.hooks.on('cart-item-add', (event, form) => {
      // Do not do AJAX if browser doesn't support FormData
      if (window.FormData === undefined) {
        return;
      }

      event.preventDefault();

      this.callbacks.willUpdate($(form));

      // Add item to cart
      utils.api.cart.itemAdd(new FormData(form), (err, response) => {
        let isError = false;

        if (err || response.data.error) {
          isError = true;
          response = err || response.data.error;
        }

        this.callbacks.didUpdate(isError, response, $(form));
      });
    });
  }
}
