/**
 *  Sets up the Flickity slideshow to use for product images
 *  along with pagination controls to switch between slides.
 *
 *  Can pass in an object set of options.
 *
 *  @param slidesWrapper      string
 *    Specify the container in which the main image slideshow sits.
 *
 *  @param slidesPagination   string
 *    The container in which the image - pagination items sit. Expected that
 *    the images are within anchors, within list-items that get "active" class
 */

import utils from '@bigcommerce/stencil-utils';
import imagesLoaded from 'imagesloaded';
import Flickity from 'flickity-imagesloaded';
import flickityasnavfor from 'flickity-as-nav-for';
import fitvids from 'fitvids';
import Zoom from 'bc-zoom';
import productViewTemplates from './productViewTemplates';

export default class ImageSlides {

  constructor(el, context, opts = {}) {
    this.$el = $(el);
    this.context = context;
    this.options = $.extend({
      slidesWrapper: '[data-images-primary]',
      slidesPagination: '[data-images-pagination]',
      context: {
        imgClass: 'ratio-1-1',
      },
    }, opts);

    this.$paginationLength = $('[data-product-thumbnails-slide]').length;

    this.imageLightbox = new Zoom('[data-product-image]', this.context);

    // Instantiate the main image slider
    this._setupMainSlides();


    // Instantiate the slides pagination (also a flickity instance)
    this.flickityPagination = new Flickity(this.options.slidesPagination, {
      asNavFor: this.options.slidesWrapper,
      contain: true,
      groupCells:true,
      pageDots: false,
      prevNextButtons: true,
      imagesLoaded: true,
      arrowShape: "M66.6 98.4c1.7 2 4.7 2 6.7.6 2-1.6 2.3-4.4.6-6.3L36 50 74 7.3c1.6-2 1.3-4.7-.7-6.3-2-1.5-5-1.3-6.7.6L26 47c-.6 1-1 2-1 3s.4 2 1 3l40.6 45.4z",
    });

    this._bindEvents();
  }

  _bindEvents() {
    // Stop the player from firing a bunch in the background
    window.onblur = () => {this.flickity.deactivatePlayer();};
    window.onfocus = () => {this.flickity.activatePlayer();};

    // Stop anchors from taking to full image (non-js action)
    $(this.options.slidesPagination).on('click', 'a', (event) => {
      event.preventDefault();
    });

    $('[data-product-image]', this.$el).on('click', (event) => {
      event.preventDefault();
    });

    this.flickity.on('staticClick', (event, pointer, cellElement, cellIndex) => {
      this.imageLightbox.show(cellIndex);
    });
  }

  _setupMainSlides() {
    if ($('.product-slide-video')) {
      fitvids('.product-slide-video');
    }

    this.flickity = new Flickity(this.options.slidesWrapper, {
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      adaptiveHeight: true,
      percentPosition: true,
      imagesLoaded: true,
    });
  }

  newImage(imgObj = {}) {
    this.removeVariantImage();
    const newImage = {
      original: utils.tools.image.getSrc(imgObj.data, 'original'),
      large: utils.tools.image.getSrc(imgObj.data, this.context.themeImageSizes['large']),
      small: utils.tools.image.getSrc(imgObj.data, this.context.themeImageSizes['thumb']),
      alt: imgObj.alt,
      index: $('[data-product-image]').length,
    }


    this.flickity.append($(productViewTemplates.optionImageMain(newImage)));

    imagesLoaded(this.$el[0], () => {
      this.flickity.reloadCells();

      this.flickity.select(newImage.index);
    });
  }

  originalImage(imgObj = {}) {
    this.removeVariantImage();
    this.flickity.select([0]);
  }

  removeVariantImage() {
    this.$el.find('[data-product-variant-image]').remove();
    this.flickity.reloadCells();
  }
}
