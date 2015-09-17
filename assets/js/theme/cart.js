import $ from 'jquery';
import PageManager from '../page-manager';
import utils from 'bigcommerce/stencil-utils';
import CartUtils from './cart/cart-utils';
import ShippingCalculator from './cart/shipping-calculator';
import Loading from 'bc-loading';

export default class Cart extends PageManager {
  loaded(next) {
    const loadingOptions = {
      loadingMarkup: '<div class="loading"><span class="loading-spinner"></span></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };

    const cartContentOverlay = new Loading(loadingOptions, true, '[data-cart-content]');
    const cartTotalsOverlay = new Loading(loadingOptions, true, '[data-cart-totals]');

    this.ShippingCalculator = new ShippingCalculator('[data-shipping-calculator]', {
      visibleClass: 'visible',
    },
    {
      willUpdate: () => cartTotalsOverlay.show(),
      didUpdate: () => cartTotalsOverlay.hide(),
    });

    this.CartUtils = new CartUtils({
      ShippingCalculator: this.ShippingCalculator,
    },
    {
      willUpdate: () => cartContentOverlay.show(),
      didUpdate: () => cartContentOverlay.hide(),
    }).init();

    next();
  }
}
