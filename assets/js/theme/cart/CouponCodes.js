import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import progressButton from '../utils/progressButton';
import refreshCart from './refreshCart';

export default class CouponCodes {
  constructor(options) {
    this.options = $.extend({
      $scope: $('[data-cart-totals]'),
      visibleClass: 'visible',
    }, options);

    this.$scope = $(this.options.$scope);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this.couponAlerts = new Alert($('[data-alerts]'));

    this._bindEvents();
  }

  _bindEvents() {
    this.$scope.on('click', '[data-coupon-code-toggle]', (event) => {
      event.preventDefault();
      this._toggle();
    });

    this.$scope.on('submit', '[data-coupon-code-form]', (event) => {
      event.preventDefault();
      this._addCode();
    });

    this.$scope.on('click', '[data-coupon-remove]', (event) => {
      event.preventDefault();
      this._removeCode($(event.currentTarget).attr('href'));
    });
  }

  _toggle() {
    $('[data-coupon-code-form]', this.$scope).toggleClass(this.options.visibleClass);
  }

  _addCode() {
    const $input = $('[data-coupon-code-input]', this.$scope);
    const code = $input.val();
    const $button = $('[data-coupon-code-form]').find('[data-coupon-code-submit]');

    this.couponAlerts.clear();

    // update button state
    progressButton.progress($button);

    if (!code) {
      this.couponAlerts.error(this.options.context.couponCodeEmptyInput, true);
      return this.callbacks.didUpdate();
    }

    utils.api.cart.applyCode(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshCart(this.callbacks.didUpdate);
        progressButton.confirmComplete($button);
      } else {
        this.couponAlerts.error(response.data.errors.join('\n'), true);
        this.callbacks.didUpdate();
        progressButton.complete($button);
      }
    });
  }

  _removeCode(removeUrl) {
    this.callbacks.willUpdate();

    $.post(removeUrl, () => {
      refreshCart(() => {
        this.callbacks.didUpdate();
      });
    });
  }
}
