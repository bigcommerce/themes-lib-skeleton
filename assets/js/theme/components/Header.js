import _ from 'lodash';

export default class Header {
  constructor(el) {
    this.$body = $(document.body);
    this.$header = $('[data-main-header]');
    this.$searchToggle = $('[data-search-toggle]');
    this.$searchBar = $('[data-search-bar]');
    this.$miniCartToggle = $('[data-cart-preview]');
    this.$miniCart = $('[data-mini-cart]');
    this.$menu = $('[data-main-menu]');
    this.$mobileToggle = $('[data-menu-toggle]');

    this.classes = {
      cartOpen: 'mini-cart-is-open',
      menuOpen: 'menu-open',
      navOpen: 'navigation-is-open',
      remove: 'removing',
      searchActive: 'search-bar-active',
      searchOpen: 'search-is-open',
      upperItemActive: 'upper-header-item-active',
      visible: 'visible',
    };

    this._bindEvents();

    if (this.$header.hasClass('logo-center')) {
      this._positionBranding();
    }
  }

  _bindEvents() {
    this.$mobileToggle.on('click', (event) => {
      event.preventDefault();
      this._toggleMenu(event);
    });

    this.$searchToggle.on('click', (event) => {
      this._toggleSearchBar();
    });

    this.$miniCartToggle.on('click tap', this._toggleMiniCart.bind(this));

    $(document).on('keydown', (event) => {
      if (!this.$body.hasClass(this.classes.cartOpen)) return;

      if (event.keyCode === 27) {
        this._toggleMiniCart(false);
      }
    });

    if (this.$header.hasClass('logo-center')) {
      $(window).on('resize', _.debounce(this._positionBranding, 10));
    }
  }

  /**
   * Toggle mobile menu visibility
   */

  _toggleMenu() {
    this.$body.toggleClass(this.classes.navOpen)
    this.$menu.toggleClass(this.classes.menuOpen);
    this.$mobileToggle.toggleClass(this.classes.menuOpen);

    if (this.$body.hasClass(this.classes.cartOpen)) {
      this.$body.removeClass(this.classes.cartOpen);
      this.$miniCart.revealer('hide');
    }
  }

  /**
   * Toggle search bar visibility
   */

  _toggleSearchBar() {
    if (!this.$searchToggle.hasClass(this.classes.upperItemActive)) {
      this.$searchToggle.addClass(this.classes.upperItemActive);
      this.$searchBar.addClass(this.classes.searchActive);

      if (this.$menu.hasClass(this.classes.menuOpen)) {
        this.$menu.addClass(this.classes.searchOpen);
      }

      if (this.$miniCart.hasClass(this.classes.visible)) {
        this.$miniCart.addClass(this.classes.searchOpen);
      }
    } else {
      this.$searchToggle.removeClass(this.classes.upperItemActive);
      this.$searchBar.removeClass(this.classes.searchActive);

      if (this.$menu.hasClass(this.classes.searchOpen)) {
        this.$menu.removeClass(this.classes.searchOpen);
      }

      if (this.$miniCart.hasClass(this.classes.searchOpen)) {
        this.$miniCart.removeClass(this.classes.searchOpen);
      }
    }
  }

  /**
   *
   * Toggle mini cart visibility
   * @param {bool} willShow force mini cart to either show (true) or hide (false)
   *
   */

  _toggleMiniCart(event, willShow) {
    event.preventDefault();

    this.$body.toggleClass(this.classes.cartOpen, willShow);
    this.$miniCart.revealer();

    if (this.$body.hasClass(this.classes.navOpen)) {
      this.$body.removeClass(this.classes.navOpen);
      this.$menu.removeClass(this.classes.menuOpen);
      this.$mobileToggle.removeClass(this.classes.menuOpen);
    }
  }

  /**
   * Postion branding in the center of the site
   */

  _positionBranding() {
    const $branding = $('[data-branding]');

    $branding.css('margin-left', 0);

    const viewportWidth = document.body.getBoundingClientRect().width;
    const brandingWidth = $branding.get(0).offsetWidth;
    const brandingPosition = $branding.get(0).getBoundingClientRect().left;
    const brandingOffset = viewportWidth / 2 - brandingPosition - brandingWidth / 2;

    if (window.matchMedia('(min-width: 720px)').matches) {
      $branding.css('margin-left', brandingOffset);
    }
  }
}
