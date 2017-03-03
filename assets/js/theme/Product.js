import $ from 'jquery';
import Alert from './components/Alert';
import ProductUtils from './product/ProductUtils';
import QuantityWidget from './components/QuantityWidget';
import productViewTemplates from './product/productViewTemplates';
import ProductReviews from './product/reviews';

export default class Product {
  constructor(context) {
    this.context = context;
    this.el = '[data-product-container]';
    this.$el = $(this.el);

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

  unload() {
    //remove all event handlers
  }
}
