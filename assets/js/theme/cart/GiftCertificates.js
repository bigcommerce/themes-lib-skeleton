import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';
import refreshContent from './refreshContent';

export default class GiftCertificates {
  constructor(el, options) {
    this.$el = $(el);

    this.options = $.extend({
      context: {},
      visibleClass: 'visible',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this.init();
  }

  init() {
    this.$toggle = $('[data-gift-certificate-toggle]', this.$el);
    this.$form = $('[data-gift-certificate-form]', this.$el);
    this.$input = $('[data-gift-certificate-input]', this.$form);
    this.$certificateErrors = new FlashMessages($('[data-certificate-errors]', this.$el));

    this._bindEvents();
  }

  _bindEvents() {
    this.$toggle.on('click', (event) => {
      event.preventDefault();
      this._toggle();
    });

    this.$form.on('submit', (event) => {
      event.preventDefault();
      this._addCode();
    });
  }

  _toggle() {
    this.$form.toggleClass(this.options.visibleClass);
  }

  _addCode() {
    const code = this.$input.val();

    this.callbacks.willUpdate();

    if (! this._isValidCode(code)) {
      this.$certificateErrors.message(this.options.context.giftCertificateInputEmpty, 'error');
      return this.callbacks.didUpdate();
    }

    utils.api.cart.applyGiftCertificate(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshContent(this.callbacks.didUpdate);
      } else {
        this.$certificateErrors.message(response.data.errors.join('\n'), 'error');
        this.callbacks.didUpdate();
      }
    });
  }

  _isValidCode(code) {
    console.log(typeof code);
    if (typeof code !== 'string') {
      return false;
    }

    return /^[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}$/.exec(code);
  }
}
