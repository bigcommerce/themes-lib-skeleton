import $ from 'jquery';
import PageManager from '../page-manager';
import ProductUtils from './product/product-utils';

export default class Product extends PageManager {
  constructor() {
    super();

    this.productUtils = new ProductUtils({
      el: '[data-product-container]',
      loader: false,
      loaderSelector: '.spinner',
      tabSelector: '.tab-link',
      visibleClass: 'visible',
      errorClass: 'form-error-message',
      buttonDisabledClass: 'button-disabled',
    });
  }

  loaded() {
    this.productUtils.init();
  }
}
