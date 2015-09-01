import $ from 'jquery';
import PageManager from '../page-manager';
import utils from 'bigcommerce/stencil-utils';
import CartUtils from './cart/cart-utils';
import ShippingCalculator from './cart/shipping-calculator';

export default class Cart extends PageManager {
  loaded(next) {
    const shippingCalculator = new ShippingCalculator(this.context, {
      visibleClass: 'visible',
    });

    const cartUtils = new CartUtils({
      shippingCalculator: shippingCalculator,
    });

    cartUtils.init();
    next();
  }
}
