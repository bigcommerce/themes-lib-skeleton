import Flickity from 'flickity-imagesloaded';
import 'flickity-bg-lazyload';

export default class Carousel {
  constructor() {
    this.$carousel = $('[data-flickity-carousel]');
    this.$slides = $('[data-flickity-slide]');

    this._init();
    this._bindEvents();
  }

  _init() {
    this.flickity = new Flickity('[data-flickity-carousel]', {
      cellSelector: '[data-flickity-slide]',
      autoPlay: parseInt(this.$carousel.attr('data-swap-frequency'), 10),
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      adaptiveHeight: true,
      imagesLoaded: true,
      bgLazyLoad: 1,
    });
  }


  _bindEvents() {
    // Toggle aria-hidden on slides
    this.flickity.on('select', () => {
      this.$slides
        .eq(this.flickity.selectedIndex)
        .attr('aria-hidden', false)
        .siblings()
        .attr('aria-hidden', true);
    });

    // Navigate slides
    $('[data-flickity-slide-prev]').on('click', (event) => {
      this.flickity.previous();
    });

    $('[data-flickity-slide-next]').on('click', (event) => {
      this.flickity.next();
    });
  }
}
