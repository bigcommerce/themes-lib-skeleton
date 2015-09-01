import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';
import refreshContent from './refresh-content';

export default class ShippingCalculator {
  constructor(context, options) {
    this.context = context;
    this.options = options;
    // TODO: Integrate OverlayUtils
    // this.overlayUtils = new OverlayUtils();

    this.init();
  }

  init() {
    this.$calculator = $('[data-shipping-calculator]');
    this.$calculatorForm = this.$calculator.children('form');
    this.$shippingQuotes = $('[data-shipping-quotes]');

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
    // TODO: Integrate OverlayUtils
    // this.overlayUtils.show();

    let params = {
      country_id: $('[name="shipping-country"]', this.$calculatorForm).val(),
      state_id: $('[name="shipping-state"]', this.$calculatorForm).val(),
      zip_code: $('[name="shipping-zip"]', this.$calculatorForm).val()
    };

    utils.api.cart.getShippingQuotes(params, 'cart/shipping-quotes', (err, response) => {
      if (response.data.quotes) {
        this.$shippingQuotes.html(response.content);
      } else {
        alert(response.data.errors.join('\n'));
      }

      // TODO: Integrate OverlayUtils
      // this.overlayUtils.hide();

      // bind the select button
      this.$shippingQuotes.find('.button').on('click', (event) => {
        event.preventDefault();

        // TODO: Integrate OverlayUtils
        // this.overlayUtils.show();

        const quoteId = $('[data-shipping-quote]:checked').val();

        utils.api.cart.submitShippingQuote(quoteId, (response) => {
          refreshContent();
        });
      });
    });
  }
}
