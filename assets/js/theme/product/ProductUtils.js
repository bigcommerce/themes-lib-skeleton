import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';

export default class ProductUtils {
  constructor(el, options) {
    this.$el = $(el);
    this.productId = this.$el.find('[data-product-id]').val();
    this.$productMessage = this.$el.find('[data-product-message]');

    this.options = $.extend({
      buttonDisabledClass: 'button-disabled',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
      switchImage: () => console.log('Image switch attempted.'),
    }, options.callbacks);

    this._bindEvents();
  }

  _bindEvents() {
    this.$el.on('click', '[data-product-quantity-change]', (event) => {
      this._updateQuantity(event);
    });
  }

  _getViewModel($el) {
    return {
      $price: $('[data-product-price-wrapper="without-tax"]', $el),
      $priceWithTax: $('[data-product-price-wrapper="with-tax"]', $el),
      $saved: $('[data-product-price-saved]', $el),
      $sku: $('[data-product-sku]', $el),
      $weight: $('[data-product-weight]', $el),
      $addToCart: $('[data-button-purchase]', $el),
    };
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

        if (viewModel.$sku.length) {
          viewModel.$sku.html(data.sku);
        }

        if (viewModel.$weight.length) {
          viewModel.$weight.html(data.weight.formatted);
        }

        if (viewModel.$price.length) {
          const priceStrings = {
            price: data.price,
            excludingTax: this.context.productExcludingTax,
          };
          viewModel.$price.html(this.options.priceWithoutTaxTemplate(priceStrings));
        }

        if (viewModel.$priceWithTax.length) {
          const priceStrings = {
            price: data.price,
            includingTax: this.context.productIncludingTax,
          };
          viewModel.$priceWithTax.html(this.options.priceWithTaxTemplate(priceStrings));
        }

        if (viewModel.$saved.length) {
          const priceStrings = {
            price: data.price,
            savedString: this.context.productYouSave,
          };
          viewModel.$saved.html(this.options.priceSavedTemplate(priceStrings));
        }

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
