import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import refreshContent from './refreshContent';

export default class ShippingCalculator {
  constructor(el, options) {
    this.$el = $(el);

    this.options = $.extend({
      visibleClass: 'visible',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this.init();
  }

  init() {
    this.$calculator = $('[data-shipping-calculator]');
    this.$calculatorForm = this.$calculator.children('form');
    this.$shippingQuotes = $('[data-shipping-quotes]');
    this.$shippingAlerts = new Alert($('[data-shipping-errors]'));

    this._bindEvents();
  }

  _bindEvents() {
    $('[data-shipping-calculator-toggle]').on('click', (event) => {
      event.preventDefault();
      this._toggle();
    });

    this.$calculatorForm.on('submit', (event) => {
      event.preventDefault();
      this._calculateShipping();
    });

    this.$calculatorForm.find('select[name="shipping-country"]').on('change', (event) => {
      this._updateStates(event);
    });
  }

  _toggle() {
    this.$calculator.toggleClass(this.options.visibleClass);
  }

  _updateStates(event) {
    const $target = $(event.currentTarget);
    const country = $target.val();
    const $stateElement = $('[name="shipping-state"]');

    utils.api.country.getByName(country, (err, response) => {
      if (response.data.states.length) {
        const stateArray = [];
        stateArray.push(`<option value="">${response.data.prefix}</option>`);
        $.each(response.data.states, (i, state) => {
          stateArray.push(`<option value="${state.id}">${state.name}</option>`);
        });
        $stateElement.replaceWith(`<select class="form-select" id="shipping-state" name="shipping-state" data-field-type="State">${stateArray.join(' ')}</select>`);
      } else {
        $stateElement.replaceWith('<input type="text" id="shipping-state" name="shipping-state" data-field-type="State">');
      }
    });
  }

  _calculateShipping() {
    this.callbacks.willUpdate();

    let params = {
      country_id: $('[name="shipping-country"]', this.$calculatorForm).val(),
      state_id: $('[name="shipping-state"]', this.$calculatorForm).val(),
      zip_code: $('[name="shipping-zip"]', this.$calculatorForm).val()
    };

    utils.api.cart.getShippingQuotes(params, 'cart/shipping-quotes', (err, response) => {
      if (response.data.quotes) {
        this.$shippingAlerts.clear();
        this.$shippingQuotes.html(response.content);
      } else {
        this.$shippingAlerts.error(response.data.errors.join('\n'));
      }

      this.callbacks.didUpdate();

      // bind the select button
      this.$shippingQuotes.find('.button').on('click', (event) => {
        event.preventDefault();

        this.callbacks.willUpdate();

        const quoteId = $('[data-shipping-quote]:checked').val();

        utils.api.cart.submitShippingQuote(quoteId, (response) => {
          refreshContent(this.callbacks.didUpdate);
        });
      });
    });
  }
}
