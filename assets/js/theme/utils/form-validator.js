import nod from 'casperin/nod';

export default class FormValidator {
  constructor(context, options = {}) {
    this.context = context;

    this.validators = {};

    this.options = $.extend({
      formSelector: '[data-validates]',
      nodOptions: {
        preventSubmit: true,
        disableSubmit: false,
        errorClass: 'form-field-error',
        successClass: 'form-field-success',
        errorMessageClass: 'form-inline-message'
      },
      extraValidators: []
    }, options);

    this._addCustomValidations();
  }

  /**
   * Add our custom validations
   *
   */
  _addCustomValidations() {
    nod.checkFunctions['phone'] = function() {
      return function (callback, value) {
        value = value.replace(/\D/g,''); // strip everything from value except numbers
        callback(value.length > 0 && value.length >= 10);
      };
    };
  }

  /**
   * Add our custom validations
   * @param {jQuery} $form  - form element. Requires a unique id!
   */
  _initValidation($form) {
    const formID = $form.attr('id');

    // scope nod to current form
    const nodOptions = $.extend({
      form: $form,
      submit: $form.find('[type="submit"]'),
    }, this.options.nodOptions);

    // disable default validation
    $form.attr('novalidate', true);

    // initialize instance
    this.validators[formID] = nod();

    this.validators[formID].configure(nodOptions);

    // add our validators
    this.validators[formID].add([
      {
        selector: $form.find('[type="email"]'),
        validate: 'email',
        errorMessage: this.context.validationEmail
      },
      {
        selector: $form.find('[required]'),
        validate: 'presence',
        errorMessage: this.context.validationRequired
      },
      {
        selector: $form.find('[type="checkbox"][required]'),
        validate: 'checked',
        errorMessage: this.context.validationRequired
      },
      {
        selector: $form.find('[type="tel"]'),
        validate: 'phone',
        errorMessage: this.context.validationPhone
      }
    ]);

    // pull in any extra validators
    if (this.options.extraValidators.length) {
      this.validators[formID].add(this.options.extraValidators);
    }
  }

  /**
   * Loop through all matching forms on page to scope validations appropriately
   *
   */
  initGlobal() {
    $(this.options.formSelector).each((index, form) => {
      this._initValidation($(form));
    });
  }

  /**
   * Manually bind validation if form's been added dynamically
   *
   */
  initForm($form) {
    this._initValidation($form);
  }

  /**
   * Return validator from collection to expose native nod.js API if desired
   *
   */
  getValidator($form) {
    const formID = $form.attr('id');
    return this.validators[formID];
  }
}
