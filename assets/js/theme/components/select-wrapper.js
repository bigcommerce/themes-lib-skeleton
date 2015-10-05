import $ from 'jquery';

export default class SelectWrapper {
  constructor(el) {
    this.$el = $(el);

    if (!this.$el.parent('.form-select-wrapper').length) {
      this.$el.wrap('<div class="form-select-wrapper" />').parent().prepend(`<span class="selected-text">${this.$el.find('option:selected').text()}</span>`);
    }

    // Conditional required so I can use the currency code as opposed to
    // the full currency name in the currency switcher
    if (!this.$el.closest('.currency-switcher').length) {
      this._bindEvents();
    }
  }

  _bindEvents() {
    this.$el.on('change', () => {
      this.updateSelectText();
    });
  }

  updateSelectText(option) {
    const newOption = option ? option : this.$el.find('option:selected').text();
    this.$el.siblings('.selected-text').text(newOption);
  }
}
