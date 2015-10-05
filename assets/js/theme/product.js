import $ from 'jquery';
import PageManager from '../page-manager';
import ProductUtils from './product/product-utils';

export default class Product extends PageManager {
  constructor() {
    super();

    this.el = '[data-product-container]';
    this.$el = $(this.el);
  }

  loaded() {
    this.ProductUtils = new ProductUtils(this.el, {
      tabSelector: '.tab-link',
      buttonDisabledClass: 'button-disabled',
      callbacks: {
        willUpdate: () => {},
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

    this.$el.find('[data-product-message]').html(message).toggleClass('form-error-message', isError);
    this.$el.find('[data-product-add] .spinner').removeClass('visible');
  }
}
