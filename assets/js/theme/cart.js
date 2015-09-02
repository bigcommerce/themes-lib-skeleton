import $ from 'jquery';
import PageManager from '../page-manager';
import utils from 'bigcommerce/stencil-utils';
import CartUtils from './cart/cart-utils';

export default class Cart extends PageManager {
  constructor() {
    this.cartUtils = new CartUtils();
  }

  loaded(next) {
    this.cartUtils.init();
    next();
  }
}
