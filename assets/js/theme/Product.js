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
      callbacks: {
        didUpdate: (isError, response) => {
          this._updateMessage(isError, response);
        },
      },
    }).init(this.context);
  }

  _updateMessage(isError, response) {
    let message = '';

    if (isError) {
      message = response;
    }

    else {
      message = this.context.addSuccess;
      message = message
                  .replace('*product*', this.$el.find('[data-product-details]').data('product-title'))
                  .replace('*cart_link*', `<a href=${this.context.urlsCart}>${this.context.cartLink}</a>`)
                  .replace('*continue_link*', `<a href='/'>${this.context.homeLink}</a>`)
                  .replace('*checkout_link*', `<a href=${this.context.urlsCheckout}>${this.context.checkoutLink}</a>`);
    }

    this.alert.message(message, (isError ? 'error' : 'success'));
    this.$el.find('[data-product-add] .spinner').removeClass('visible');
  }
}
