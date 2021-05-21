export default class ProductForm {
  constructor() {
    this.$form = $('[data-cart-item-add]');
    this._bindEvents();
    this._onProductFormLoad();
    this._onProductFormChange();
  }

  _bindEvents() {
    $('body').on('change', '[data-cart-item-add]', this._onProductFormChange.bind(this));
  }

  _onProductFormLoad() {
    const $productCustomizeContainer = $('[data-product-customize-dynamic-content]');
    const $fields = this.$form.find('.form-field-textarea')
      .add(this.$form.find('.form-field-text'))
      .add(this.$form.find('.form-field-number:not([data-product-quantity])'))
      .add(this.$form.find('.form-field-file'))
      .add(this.$form.find('.form-field-date'));

    $fields.appendTo($productCustomizeContainer);
  }

  _onProductFormChange(event) {
    const $inputTitles = $('[data-cart-item-add] .form-field-title');
    const $productSummaryContainer = $('[data-product-summary-dynamic-content]');
    $productSummaryContainer.empty();

    $inputTitles.each((index, value) => {
      const $inputTitle = $(value);
      const $inputTitleClean = $inputTitle.clone().children().remove().end().text();
      const $checkboxes = $inputTitle.siblings().find('input[type="checkbox"]');
      const $radios = $inputTitle.siblings().find('input[type="radio"]:checked');
      const $selects = $inputTitle.siblings().find('select option:selected');
      const $textareas = $inputTitle.siblings().find('textarea');
      const $inputs = $inputTitle.siblings().find('input:not([type="radio"]):not([type="checkbox"]):not(:disabled)');
      let content = '';
      let inputValues = '';

      content += `<div class="product-summary-option"><span class="product-option-title">${$inputTitleClean}</span>`;
      content += `<div class="product-option-values">`;

      $checkboxes.each((index, value) => {
        const $checkbox = $(value);
        inputValues += this._formatCheckbox($checkbox);
      });

      $radios.each((index, value) => {
        const $radio = $(value);
        inputValues += this._formatRadio($radio);
      });

      $selects.each((index, value) => {
        const $select = $(value);
        inputValues += this._formatSelect($select);
      });

      $textareas.each((index, value) => {
        const $textarea = $(value);
        inputValues += this._formatInput($textarea);
      });

      $inputs.each((index, value) => {
        const $input = $(value);
        inputValues += this._formatInput($input);
      });

      content += inputValues;
      content += `</div></div>`;

      if (inputValues !== '') $productSummaryContainer.append(content);
    });
  }

  _formatCheckbox($checkbox) {
    const isSelected = $checkbox.is(':checked');

    return `<span class="product-option-value">${isSelected ? "Yes" : "No"}</span>`;
  }

  _formatSelect($selectOption) {
    const text = $selectOption.text();

    return text !== '' ? `<span class="product-option-value">${text}</span>` : '';
  }

  _formatRadio($radio) {
    let text = $($radio.siblings('.form-label-text')).text();

    if ($radio.hasClass('product-picklist-radio')) {
      text = $radio.siblings().find('.form-label-text').text();
    }

    if ($radio.hasClass('swatch-radio')) {
    }

    return text !== '' ? `<span class="product-option-value">${text}</span>` : '';
  }

  _formatInput($input) {
    const text = $input.val();

    return text !== '' ? `<span class="product-option-value">${text}</span>` : '';
  }

}
