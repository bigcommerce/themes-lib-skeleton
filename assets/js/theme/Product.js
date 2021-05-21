import PageManager from '../PageManager';
import Alert from './components/Alert';
import ProductImages from './product/ProductImages';
import ProductUtils from './product/ProductUtils';
import QuantityWidget from './components/QuantityWidget';
import initFormSwatchFields from './core/formSelectedValue';
import productViewTemplates from './product/productViewTemplates';
import ProductReviews from './product/ProductReviews';
import Forms from './common/Forms';
import CustomTabs from './common/Tabs';
import ProductForm from './product/ProductForm';
import progressButton from './utils/progressButton';
import FormValidator from './utils/FormValidator';
import Modal from 'bc-modal';
import Tabs from 'bc-tabs';

export default class Product extends PageManager {
  constructor() {
    super();

    this.$body = $('html, body');

    this.el = '[data-product-container]';
    this.$el = $(this.el);
    this.$customizedProduct = $('[data-customize-product]')
    this.$wishlistLink = this.$el.find('[data-wishlist-link]');
    this.$reviewLink = this.$el.find('[data-review-section-link]');
    this.$title = $('[data-product-title]').attr('data-product-title');
    this.$addToCartForm = $('[data-cart-item-add]');

    new Forms();

    if (this.$customizedProduct.length) {
      new CustomTabs();
      new ProductForm();
    }

    this._initTabs();
  }

  loaded() {
    // Product swatches
    initFormSwatchFields();

    this.Validator = new FormValidator(this.context);

    // Alerts
    this.alert = new Alert($('[data-product-message]'));
    this.quantityControl = new QuantityWidget({scope: '[data-cart-item-add]'});

    new ProductReviews(this.context);
    this.images = new ProductImages(this.$el, this.context); // Enable slider / images

    this.ProductUtils = new ProductUtils(this.el, {
      priceWithoutTaxTemplate: productViewTemplates.priceWithoutTax,
      priceWithTaxTemplate: productViewTemplates.priceWithTax,
      priceSavedTemplate: productViewTemplates.priceSaved,
      callbacks: {
        switchImage: _.bind(this.images.newImage, this.images),
        originalImage: _.bind(this.images.originalImage, this.images),
      },
    }).init(this.context);

    this.wishlistModal = new Modal({
      el: $('#modal-wishlist-form'),
      modalClass: 'modal-add-wishlist',
      afterShow: ($modal) => {
        const $form = $('#form-wishlist');
        this.Validator.initSingle($form);
        this._bindAddWishlist($modal);
      },
    });

    if (this.$wishlistLink.hasClass('wishlist-modal-link')) {
      this._bindEvents();
    }
  }

  _initTabs() {
    this.tabs = new Tabs({
      afterSetup: (tabId) => {
      },
      afterChange: () => {
        const tabId =  `#${$('[data-tab-content]:visible').attr('id')}`;
      },
      keepTabsOpen() {
        return window.innerWidth < 720;
      }
    });
  }

  _bindEvents() {
    // Activate the reviews tab when we jump down to it
    this.$reviewLink.on('click', (event) => {
      event.preventDefault();

      this.$body
        .scrollTop($('[data-tabs]')
        .offset().top);

      this.tabs.activateTabToggle('#write_review');
      this.tabs.activateTabContent('#write_review');
    });

    // Open wishlist modal
    this.$el.on('click', '[data-wishlist-link]', (event) => {
      event.preventDefault();
      this.wishlistModal.open();
    });
  }

  /**
   * Ajax add to wishlist
   *
   */
  _bindAddWishlist($modal) {
    $modal.on('click', '[data-wishlist-submit]', (event) => {
      event.preventDefault();
      const $select = $modal.find('select[name="product-wishlist"]');
      const addUrl = $select.val();
      const $name = $('#product-wishlist option:selected').attr('label');
      const $dropdownButton = $('[data-wishlist-submit]');

      if ($('[data-is-customer]').length) {
        event.preventDefault();

        progressButton.progress($dropdownButton);

        $.ajax({
          type: 'POST',
          url: addUrl,
          success: () => {
            this.alert.success(this.context.messagesWishlistAddSuccess.replace('*product*', this.$title).replace('*name*', $name), false);
          },
          error: () => {
            this.alert.error(this.context.messagesWishlistAddError.replace('*product*', this.$title), false);
          },
          complete: () => {
            progressButton.confirmComplete($dropdownButton);
          },
        });
      }
    });
  }
}
