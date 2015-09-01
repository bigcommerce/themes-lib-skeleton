import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';

export default class CartUtils {
  constructor(modules) {
    this.modules = modules;
    this.$body = $(document.body);
    this.productData = {};
  }

  init() {
    this._cacheInitialQuantities();
    this._bindEvents();
  }

  _bindEvents() {
    $('[data-cart-item-quantity-change]').on('click', (event) => {
      event.preventDefault();
      this._updateQuantity(event);
    });

    $('[data-cart-item-update]').on('click', (event) => {
      event.preventDefault();
      this._updateCartItem(event);
    });

    $('[data-cart-item-remove]').on('click', (event) => {
      event.preventDefault();
      this._removeCartItem(event);
    });

    // TODO: Ensure that this implementation works correctly and doesn't produce and infinite loop.
    this.$body.on('bind-events-cart', () => {
      this._rebindEvents();
    });
  }

  _rebindEvents() {
    this._bindEvents();
    this.modules.shippingCalculator.init();

    // TODO: Add SelectWrapper js
    // const $select = $('[data-shipping-calculator]').find('select');
    // $select.each((i) => {
    //   new SelectWrapper($select.eq(i));
    // });
  }

  _cacheInitialQuantities() {
    $('[data-cart-item]').each((i, el) => {
      const $cartItem = $(el);
      const itemId = $cartItem.data('item-id');
      this.productData[itemId] = {
        oldQuantity: parseInt($cartItem.find('[data-cart-item-quantity-input]').val(), 10),
        quantityAltered: false
      };
    });
  }

  _updateQuantity(event) {
    const $target = $(event.target);
    const $cartItem = $target.closest('[data-cart-item]');
    const itemId = $cartItem.data('item-id');
    const $quantityInput = $cartItem.find('[data-cart-item-quantity-input]');
    const min = $quantityInput.prop('min');
    const max = $quantityInput.prop('max');
    let newQuantity = parseInt($quantityInput.val(), 10);

    if ($target.is('[data-cart-item-quantity-increment]') && (!max || newQuantity < max)) {
      newQuantity = newQuantity + 1;
    } else if ($target.is('[data-cart-item-quantity-decrement]') && newQuantity > min) {
      newQuantity = newQuantity - 1;
    }

    $quantityInput.val(newQuantity);

    this.productData[itemId].newQuantity = newQuantity;
    this.productData[itemId].quantityAltered = true;
  }

  _updateCartItem(event) {
    const $target = $(event.currentTarget);
    const $cartItem = $target.closest('[data-cart-item]');
    const itemId = $cartItem.data('item-id');

    // TODO: Integrate OverlayUtils class
    // this.overlayUtils.show();

    if (this.productData[itemId].quantityAltered) {
      const $quantityInput = $cartItem.find('[data-cart-item-quantity-input]');
      const newQuantity = this.productData[itemId].newQuantity;

      utils.api.cart.itemUpdate(itemId, newQuantity, (err, response) => {
        if (response.data.status === 'succeed') {
          this.productData[itemId].oldQuantity = newQuantity;

          const remove = (newQuantity === 0);
          refreshContent(remove);
        } else {
          $quantityInput.val(this.productData[itemId].oldQuantity);
          // TODO: Setup proper error handling?
          alert(response.data.errors.join('\n'));
          // TODO: Integrate OverlayUtils class
          // this.overlayUtils.hide();
        }
      });
    }
  }

  _removeCartItem() {
    // TODO: Integrate OverlayUtils class
    // this.overlayUtils.show();

    const $target = $(event.currentTarget);
    const itemId = $target.closest('[data-cart-item]').data('item-id');

    utils.api.cart.itemRemove(itemId, (err, response) => {
      if (response.data.status === 'succeed') {
        refreshContent(true);
      } else {
        // TODO: Setup proper error handling?
        alert(response.data.errors.join('\n'));
        // TODO: Integrate OverlayUtils class
        // this.overlayUtils.hide();
      }
    });
  }
}
