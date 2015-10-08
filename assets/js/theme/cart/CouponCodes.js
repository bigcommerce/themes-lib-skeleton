import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';
import refreshContent from './refreshContent';

export default class CouponCodes {
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
    this.$toggle = $('[data-coupon-code-toggle]', this.$el);
    this.$form = $('[data-coupon-code-form]', this.$el);
    this.$input = $('[data-coupon-code-input]', this.$form);

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

    if (!code) {
      // TODO: Proper error handling
      alert(this.options.context.couponCodeEmptyInput);
      return this.callbacks.didUpdate();
    }

    utils.api.cart.applyCode(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshContent(this.callbacks.didUpdate);
      } else {
        // TODO: Proper error handling
        alert(response.data.errors.join('\n'));
        this.callbacks.didUpdate();
      }
    });
  }
}
