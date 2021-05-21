import utils from '@bigcommerce/stencil-utils';

export default class MiniCart {
  constructor() {
    this.$body = $(document.body);

    this.loadingMarkup = '<div class="mini-cart-item-overlay"><div class="spinner"></div></div>';

    this.cartChangeRemoteHooks = [
      'cart-item-add-remote',
      'cart-item-update-remote',
      'cart-item-remove-remote',
    ];

    this._bindEvents();
  }

  _bindEvents() {
    // Update mini cart on remote add
    this.cartChangeRemoteHooks.forEach((hook) => {
      utils.hooks.on(hook, () => {
        this._update();
      });
    });

    // Remove cart item using minicart button
    this.$body.on('click', '.mini-cart [data-cart-item-remove]', (event) => {
      event.preventDefault();
      this._removeProductMiniCart(event.currentTarget);
    });
  }

  /**
   * Update the mini cart contents
   */
  _update(callback = () => {}) {
    const $miniCartCount = $('.mini-cart-count');
    const $miniCartContents = $('.mini-cart-contents');

    // Update the minicart items when
    // a product is added / removed
    utils.api.cart.getContent({ template: 'mini-cart/mini-cart-contents' }, (err, response) => {
      $miniCartContents.html(response);

      // Update the header cartCount
      const cartCount = parseInt($(response).find('.cart-count').text(), 10);

      // show / hide cartCount and control bag display
      if (cartCount) {
        $miniCartCount.addClass('show').find('.number').html(cartCount);
      } else {
        $miniCartCount.removeClass('show');
      }

      callback();
    });
  }

  /**
   * Remove a product from the mini cart
   */
  _removeProductMiniCart(removeItem) {
    this.$el = $(removeItem);
    const itemId = this.$el.attr('data-product-id');

    if (!itemId) { return; }

    this.$el
      .closest('.mini-cart-item')
      .addClass('removing')
      .append(this.loadingMarkup);

    utils.api.cart.itemRemove(itemId, (err, response) => {
      if (response.data.status === 'succeed') {
        this._update();
      } else {
        alert(response.data.errors.join('\n'));

        this.$el
          .closest('.mini-cart-item')
          .removeClass('removing')
          .find('.mini-cart-item-overlay')
          .remove();
      }
    });
  }
}
