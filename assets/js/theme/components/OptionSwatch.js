// Binds some minor functionality to Product Option Swatch Components
// Updates the "selected option" string when choosing different options

import $ from 'jquery';

export default class OptionSwatch {
  constructor(elementSelector = '[data-swatch-selector]') {
    this.element = $(elementSelector);
    this._bindFunctionality();
  }

  _bindFunctionality() {
    this.element.on('click', '.swatch-wrap', (e) => {
      const $target = $(e.currentTarget);
      const $swatchText = $target.closest('[data-swatch-selector]').find('.swatch-value');
      const swatchValue = $target.data('swatch-value');

      $swatchText.text(swatchValue);
    });
  }
}
