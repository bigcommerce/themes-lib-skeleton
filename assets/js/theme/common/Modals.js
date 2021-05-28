export default class Modals {
  constructor() {
    this._bindEvents();
  }

  _bindEvents() {
    $('body').on('click', '[data-modal-toggle]', this._onModalToggleClick.bind(this));
  }

  _onModalToggleClick(event) {
    event.preventDefault();
    const $modalToggle = $(event.currentTarget);
    const id = $modalToggle.data('modal-toggle');
    const $modal = $(`[data-modal="${id}"]`);

    if (!id || !$modal.length) return;

    $modal.toggleClass('modal-visible');
  }
}
