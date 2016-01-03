import $ from 'jquery';
import PageManager from '../PageManager';
import Alert from './components/Alert';
import ProductUtils from './product/ProductUtils';
import QuantityWidget from './components/QuantityWidget';
import productViewTemplates from './product/productViewTemplates';
import ProductReviews from './product/reviews';

export default class Product extends PageManager {
  constructor() {
    super();

    this.el = '[data-product-container]';
    this.$el = $(this.el);
  }

  loaded() {
    this.alert = new Alert($('[data-product-message]'));
    this.quantityControl = new QuantityWidget({scope: '[data-cart-item-add]'});

    new ProductReviews(this.context);

    this.ProductUtils = new ProductUtils(this.el, {
      priceWithoutTaxTemplate: productViewTemplates.priceWithoutTax,
      priceWithTaxTemplate: productViewTemplates.priceWithTax,
      priceSavedTemplate: productViewTemplates.priceSaved,
      callbacks: {},
    }).init(this.context);
  }
}
