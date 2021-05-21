import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import progressButton from '../utils/progressButton';
import refreshCart from './refreshCart';

export default class GiftCertificates {
  constructor(options) {
    this.options = $.extend({
      $scope: $('[data-cart-totals]'),
      visibleClass: 'visible',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this.$scope = $(this.options.$scope);

    this.certificateAlerts = new Alert($('[data-alerts]'));

    this._bindEvents();
  }

  _bindEvents() {
    this.$scope.on('click', '[data-gift-certificate-toggle]', (event) => {
      event.preventDefault();
      this._toggle();
    });

    this.$scope.on('submit', '[data-gift-certificate-form]', (event) => {
      event.preventDefault();
      this._addCode();
    });

    this.$scope.on('click', '[data-gift-certificate-remove]', (event) => {
      event.preventDefault();
      this._removeCode($(event.currentTarget).attr('href'));
    });
  }

  _toggle() {
    $('[data-gift-certificate-form]', this.$scope).toggleClass(this.options.visibleClass);
  }

  _addCode() {
    const $input = $('[data-gift-certificate-input]', this.$scope);
    const code = $input.val();
    const $button = $('[data-gift-certificate-form]').find('[data-gift-certificate-submit]');

    this.certificateAlerts.clear();

    // update button state
    progressButton.progress($button);

    if (! this._isValidCode(code)) {
      this.certificateAlerts.error(this.options.context.giftCertificateInputEmpty, true);
      return this.callbacks.didUpdate();
    }

    utils.api.cart.applyGiftCertificate(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshCart(this.callbacks.didUpdate);
        progressButton.confirmComplete($button);
      } else {
        this.certificateAlerts.error(response.data.errors.join('\n'), true);
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

  _isValidCode(code) {
    if (typeof code !== 'string') {
      return false;
    }

    // Add any custom gift certificate validation logic here
    return true;
  }
}
