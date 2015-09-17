import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';
import refreshContent from './refresh-content';

export default class CartUtils {
  constructor(modules, callbacks) {
    this.modules = modules;
    this.$cartContent = $('[data-cart-content]');
    this.productData = {};

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, callbacks);
  }

  init() {
    this._cacheInitialQuantities();
    this._bindEvents();
  }

  _bindEvents() {
    this.$cartContent.on('click', '[data-cart-item-quantity-change]', (event) => {
      event.preventDefault();
      this._updateQuantity(event);
    });

    this.$cartContent.on('click', '[data-cart-item-update]', (event) => {
      event.preventDefault();
      this._updateCartItem(event);
    });

    this.$cartContent.on('click', '[data-cart-item-remove]', (event) => {
      event.preventDefault();
      this._removeCartItem(event);
    });

    this.$cartContent.on('cart-initialize-modules', () => {
      this.modules.shippingCalculator.init();

      // TODO: Add SelectWrapper js
      // const $select = $('[data-shipping-calculator]').find('select');
      // $select.each((i) => {
      //   new SelectWrapper($select.eq(i));
      // });
    });
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
    const min = parseInt($quantityInput.prop('min'), 10);
    const max = parseInt($quantityInput.prop('max'), 10);
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

    this.callbacks.willUpdate();

    if (this.productData[itemId].quantityAltered) {
      const $quantityInput = $cartItem.find('[data-cart-item-quantity-input]');
      const newQuantity = this.productData[itemId].newQuantity;

      utils.api.cart.itemUpdate(itemId, newQuantity, (err, response) => {
        if (response.data.status === 'succeed') {
          this.productData[itemId].oldQuantity = newQuantity;

          const remove = (newQuantity === 0);
          refreshContent(this.callbacks.didUpdate, remove);
        } else {
          $quantityInput.val(this.productData[itemId].oldQuantity);
          // TODO: Setup proper error handling?
          alert(response.data.errors.join('\n'));

          this.callbacks.didUpdate();
        }
      });
    }
  }

  _removeCartItem() {
    this.callbacks.willUpdate();

    const $target = $(event.currentTarget);
    const itemId = $target.closest('[data-cart-item]').data('item-id');

    utils.api.cart.itemRemove(itemId, (err, response) => {
      if (response.data.status === 'succeed') {
        refreshContent(this.callbacks.didUpdate, true);
      } else {
        // TODO: Setup proper error handling?
        alert(response.data.errors.join('\n'));

        this.callbacks.didUpdate();
      }
    });
  }
}
