export default class Forms {
  constructor() {
    this._bindEvents();
  }

  _bindEvents() {
    $('body').on('change', '[data-file-upload]', this._onFileUploadChange.bind(this));
    $('body').on('click', '[data-form-input-control-up]', this._onFormInputControlUpClick.bind(this));
    $('body').on('click', '[data-form-input-control-down]', this._onFormInputControlDownClick.bind(this));
  }

  _onFileUploadChange(event) {
    const $fileUploadButtonContainer = $(event.currentTarget);
    const $fileUploadButton = $fileUploadButtonContainer.find('input[type="file"]');
    const $fileUploadTextContainer = $fileUploadButtonContainer.siblings('[data-file-upload-text]');

    if (!$fileUploadButton || !$fileUploadTextContainer) return;

    $fileUploadTextContainer.val($fileUploadButton.val());
  }

  _onFormInputControlUpClick(event) {
    this._addToFormInputValue(event, 1);
  }

  _onFormInputControlDownClick(event) {
    this._addToFormInputValue(event, -1);
  }

  _addToFormInputValue(event, value) {
    const $input = $(event.currentTarget).siblings('[data-form-input-number]');
    const val = parseInt($input.val(),10) || 0;

    if (!$input) return;

    $input.val(val + value);
    $input.trigger('change');
  }
}
