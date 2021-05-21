import Modal from 'bc-modal';
import FormValidator from '../utils/FormValidator';

export default class Reviews {
  constructor(context) {
    this.context = context;
    this.url = location.href;

    this.validator = new FormValidator(this.context);

    this.reviewModal = new Modal({
      el: $('#modal-review-form'),
      modalClass: 'modal-leave-review',
      afterShow: () => {
        const $form = $('#form-leave-a-review');
        this.validator.initSingle($form);
      },
    });

    this._bindEvents();
    this._productReviewHandler();
  }

  _bindEvents() {
    $('[data-review-link]').on('click', (event) => {
      event.preventDefault();
      this.reviewModal.open();
    });

    $('[data-show-all-reviews]').on('click', (event) => {
      event.preventDefault();
      const reviewToggle = event.currentTarget;
      this._showMoreReviews(reviewToggle);
    });
  }

  _showMoreReviews(reviewToggle) {
    const $totalReviews = $('.review-item').length;
    const batchLimit = 12; // Number of reviews to show at a time
    const $hiddenReviews = $('.review-item.hidden');
    const hideButton = $hiddenReviews.length <= batchLimit; // Hide if is 12 reviews

    // From array of hidden reviews, cut down to 12 items
    $hiddenReviews.slice(0, batchLimit).each((index, el) => {
      setTimeout(() => {
        $(el).show();
        $(el).removeClass('hidden')
      }, index * 250);
    });

    if (hideButton) {
      $(reviewToggle).hide();
    }
  }

  _productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.reviewModal.open();
    }
  }
}
