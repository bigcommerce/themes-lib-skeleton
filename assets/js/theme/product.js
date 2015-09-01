import $ from 'jquery';
import PageManager from '../page-manager';

export default class Product extends PageManager {
  constructor() {
    super();

    this.productUtils = new ProductUtils({
      el: '.product-wrap',
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
