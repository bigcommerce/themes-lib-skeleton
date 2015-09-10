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

    const shippingCalculator = new ShippingCalculator({
      visibleClass: 'visible',
    },
    {
      willUpdate: () => cartTotalsOverlay.show(),
      didUpdate: () => cartTotalsOverlay.hide(),
    });

    const cartUtils = new CartUtils({
      shippingCalculator: shippingCalculator,
    },
    {
      willUpdate: () => cartContentOverlay.show(),
      didUpdate: () => cartContentOverlay.hide(),
    }).init();

    next();
  }
}
