import $ from 'jquery';
import PageManager from '../page-manager';
import utils from 'bigcommerce/stencil-utils';
import CartUtils from './cart/cart-utils';
import ShippingCalculator from './cart/shipping-calculator';
import CouponCodes from './cart/coupon-codes';
import GiftCertificates from './cart/gift-certificates';
import Loading from 'bc-loading';

export default class Cart extends PageManager {
  loaded(next) {
    const context = this.context;

    const loadingOptions = {
      loadingMarkup: '<div class="loading"><span class="loading-spinner"></span></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };

    const cartContentOverlay = new Loading(loadingOptions, true, '[data-cart-content]');
    const cartTotalsOverlay = new Loading(loadingOptions, true, '[data-cart-totals]');

    this.ShippingCalculator = new ShippingCalculator('[data-shipping-calculator]', {
      visibleClass: 'visible',
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // },
    });

    this.CouponCodes = new CouponCodes('[data-coupon-codes]', {
      visibleClass: 'visible',
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // },
    });

    this.GiftCertificates = new GiftCertificates('[data-gift-certificates]', {
      context,
      visibleClass: 'visible',
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // },
    });

    this.CartUtils = new CartUtils({
      ShippingCalculator: this.ShippingCalculator,
      CouponCodes: this.CouponCodes,
    }, {
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // },
    }).init();

    next();
  }
}
