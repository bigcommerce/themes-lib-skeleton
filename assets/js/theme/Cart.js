import PageManager from '../PageManager';
import utils from '@bigcommerce/stencil-utils';
import CartUtils from './cart/CartUtils';
import ShippingCalculator from './cart/ShippingCalculator';
import CouponCodes from './cart/CouponCodes';
import GiftCertificates from './cart/GiftCertificates';
import GiftWrapping from './cart/GiftWrapping';
import Loading from 'bc-loading';
import loadingOptions from './utils/loadingOptions';
import QuantityWidget from './components/QuantityWidget';
import Modals from './common/Modals';
import EditOptions from './cart/EditOptions';

export default class Cart extends PageManager {
  constructor() {
    super();

    this.cartContentOverlay = new Loading(loadingOptions, false, '[data-cart-content]');
    this.cartTotalsOverlay = new Loading(loadingOptions, false, '[data-cart-totals]');

    new QuantityWidget({scope: '[data-cart-content]'});

    new ShippingCalculator();

    new Modals();

    new CartUtils({
      callbacks: {
        willUpdate: () => {
          this.cartContentOverlay.show();
        },
        didUpdate: () => {},
      },
    });

    if (window.ApplePaySession && $('.dev-environment').length) {
      $(document.body).addClass('apple-pay-supported');
    }
  }

  loaded() {
    new GiftWrapping({
      scope: '[data-cart-content]',
      context: this.context,
    });

    new CouponCodes({
      scope: '[data-cart-totals]',
      context: this.context,
      visibleClass: 'visible',
      callbacks: {
        willUpdate: () => {
          this.cartTotalsOverlay.show();
        },
        didUpdate: () => {
          this.cartTotalsOverlay.hide();
        },
      },
    });

    new GiftCertificates({
      scope: '[data-cart-totals]',
      context: this.context,
      visibleClass: 'visible',
      callbacks: {
        willUpdate: () => {
          this.cartTotalsOverlay.show();
        },
        didUpdate: () => {
          this.cartTotalsOverlay.hide();
        },
      },
    });

    new EditOptions(this.context);
  }
}
