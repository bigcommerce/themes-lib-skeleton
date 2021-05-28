/*
 * Prepends a span containing the currently selected text value to matching select elements
 * and updates that span's text on input change.
 *
 * Requires for the <select> to have a direct parent .form-select-wrapper element.
 */
export default class SelectWrapper {
  constructor(el) {
    this.$el =  el.jquery ? el : $(el);
    this.$parent = this.$el.parent('.form-select-wrapper');

    // only run if wrapper is in place AND it's not the currency selector
    if (this.$parent.length && !this.$parent.closest('[data-currency-selector]').length) {
      this._init();
    }
  }

  _init() {
    // grab selected option if it exists, otherwise grab the first option
    const $currentOption =
      this.$el.find('option[selected]').length
        ? this.$el.find('option[selected]')
        : this.$el.find('option:first');

    if (this.$parent.find('.form-selected-text').length === 0) {
      this.$el.before(`<span class="form-selected-text">${$currentOption.text()}</span>`);
    }

    this._bindEvents();
  }

  _bindEvents() {
    this.$el.on('change', () => {
      this.updateSelectText();
    });
  }

  updateSelectText(option) {
    const newOption = option ? option : this.$el.find('option:selected').text();
    this.$el.siblings('.form-selected-text').text(newOption);
  }
}
