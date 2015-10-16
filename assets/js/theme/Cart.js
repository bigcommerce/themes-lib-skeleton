import $ from 'jquery';
import PageManager from '../PageManager';
import utils from 'bigcommerce/stencil-utils';
import CartUtils from './cart/CartUtils';
import ShippingCalculator from './cart/ShippingCalculator';
import CouponCodes from './cart/CouponCodes';
import GiftCertificates from './cart/GiftCertificates';
import GiftWrapping from './cart/GiftWrapping';
import Loading from 'bc-loading';
import QuantityWidget from './components/QuantityWidget';


export default class Cart extends PageManager {
  loaded(next) {
    const context = this.context;
    this.quantityControl = new QuantityWidget({scope: '[data-cart-content]'});

    const loadingOptions = {
      loadingMarkup: '<div class="loading"><span class="loading-spinner"></span></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };

    new GiftWrapping({scope: '[data-cart-content]', context});
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
      context,
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
      GiftCertificates: this.GiftCertificates,
    }, {
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // },
    }).init();

    next();
  }
}
