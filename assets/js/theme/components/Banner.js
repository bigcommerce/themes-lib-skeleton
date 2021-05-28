export default class Banner {
  constructor(el) {
    this._init();
  }

  _init() {
    this._bindEvents();
  }

  _bindEvents() {
    $('[data-banner-dismiss]').on('click', (event) => {
      const $banner = $(event.currentTarget).parent();

      $banner.revealer('hide');
    });

    $('[data-banner]').on('alert-update', (event) => {
      const $alert = $(event.target);
      const $banner = $(event.currentTarget);

      if ($alert.hasClass('alert-error')) {
        $banner.removeClass('banner-success');
        $banner.addClass('banner-error');
      } else if ($alert.hasClass('alert-success')) {
        $banner.removeClass('banner-error');
        $banner.addClass('banner-success');
      }

      $banner.revealer('show');
    });
  }
}
