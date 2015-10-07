import $ from 'jquery';
import _ from 'lodash';
import PageManager from '../page-manager';
import ProductUtils from './product/product-utils';
import QuantityWidget from './components/quantity-widget'

export default class Product extends PageManager {
  constructor() {
    super();

    this.el = '[data-product-container]';
    this.$el = $(this.el);
  }

  loaded() {
    this.quantityControl = new QuantityWidget({scope: '[data-cart-item-add]'});

    const priceWithoutTaxTemplate = _.template(`
      <% if (typeof(without_tax) !== "undefined") { %>
        <span>
          <%= without_tax.formatted %>
        </span>
      <% } %>

      <% if (typeof(rrp_without_tax) !== "undefined") { %>
        <span>
          <%= rrp_without_tax.formatted %>
        </span>
      <% } %>
    `);

    const priceWithTaxTemplate = _.template(`
      <% if (typeof(with_tax) !== "undefined") { %>
        <span>
          <%= with_tax.formatted %>
        </span>
      <% } %>

      <% if (typeof(rrp_without_tax) !== "undefined") { %>
        <span>
          <%= rrp_with_tax.formatted %>
        </span>
      <% } %>
    `);

    const priceSavedTemplate = _.template(`
      <% if (typeof(saved) !== "undefined") { %>
        <%= saved.formatted %>
      <% } %>
    `);

    this.ProductUtils = new ProductUtils(this.el, {
      priceWithoutTaxTemplate,
      priceWithTaxTemplate,
      priceSavedTemplate,
      tabSelector: '.tab-link',
      buttonDisabledClass: 'button-disabled',
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

    this.$el.find('[data-product-message]').html(message).toggleClass('form-error-message', isError);
    this.$el.find('[data-product-add] .spinner').removeClass('visible');
  }
}
