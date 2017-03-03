import $ from 'jquery';

export default class CurrencySelector {
  constructor(el) {
    this.$el = $(el);
    this.$currencySelector = this.$el.find('select');

    this._bindEvents();
  }

  unload() {
    //remove all event handlers
  }

  _bindEvents() {
    this.$currencySelector.on('change', (event) => {
      this._updateCurrency();
    });
  }

  _updateCurrency() {
    let newCurrency = this.$currencySelector.val();
    window.location = newCurrency;
  }
}
