import $ from 'jquery';
import Modal from 'bc-modal';
import FormValidator from '../utils/form-validator';

export default class ProductReviews {
  constructor(context) {
    this.context = context;

    this.validator = new FormValidator(context, {
      extraValidators: [
        {
          selector: '[name="revrating"]',
          validate: 'some-radio',
          errorMessage: this.context.validationRating
        }
      ]
    });

    this.reviewModal = new Modal({
      el: $('#modal-review-form'),
      modalClass: 'modal-leave-review',
      afterShow: () => {
        const $form = $('#form-leave-a-review');
        this.validator.initForm($form);
      }
    });

    this._bindEvents();
  }

  _bindEvents() {
    $('.review-link').click((event) => {
      event.preventDefault();
      this.reviewModal.open();
    });
  }
}
