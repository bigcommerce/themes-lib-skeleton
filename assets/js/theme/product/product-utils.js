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
      $price: $('[data-product-price="without-tax"]', $el),
      $priceWithTax: $('[data-product-price="with-tax"]', $el),
      $rrp: $('[data-product-rrp="without-tax"]', $el),
      $rrpWithTax: $('[data-product-rrp="with-tax"]', $el),
      $saved: $('[data-product-price-saved]', $el),
      $sku: $('[data-product-sku]', $el),
      $weight: $('[data-product-weight]', $el),
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
        const price = data.price.without_tax ? data.price.without_tax : false;
        const priceWithTax = data.price.with_tax ? data.price.with_tax : false;
        const rrp = data.price.rrp_without_tax ? data.price.rrp_without_tax : false;
        const rrpWithTax = data.price.rrp_with_tax ? data.price.rrp_with_tax : false;
        const saved = data.price.saved ? data.price.saved : false;

        console.log(data.price);

        viewModel.$sku.html(data.sku);
        viewModel.$weight.html(data.weight.formatted);

        if (viewModel.$price.length) {
          viewModel.$price.html(price.formatted);
        }

        if (viewModel.$priceWithTax.length) {
          viewModel.$priceWithTax.html(priceWithTax.formatted);
        }

        if (rrp && viewModel.$rrp.length) {
          viewModel.$rrp.html(rrp.formatted);
        } else if (rrp) {
          viewModel.$price.after(`<span data-product-rrp="without-tax">${rrp.formatted}</span>`);
          viewModel.$rrp = this.$el.find('[data-product-rrp="without-tax"]');
        } else if (viewModel.$rrp.length) {
          viewModel.$rrp.remove();
        }

        if (rrpWithTax && viewModel.$rrpWithTax.length) {
          viewModel.$rrp.html(rrpWithTax.formatted);
        } else if (rrpWithTax) {
          viewModel.$priceWithTax.after(`<span data-product-rrp="with-tax">${rrpWithTax.formatted}</span>`);
          viewModel.$rrpWithTax = this.$el.find('[data-product-rrp="with-tax"]');
        } else if (viewModel.$rrpWithTax.length) {
          viewModel.$rrpWithTax.remove();
        }

        if (viewModel.$saved.length) {
          if (saved) {
            viewModel.$saved.html(saved.formatted);
          } else {
            viewModel.$saved.empty();
          }
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
