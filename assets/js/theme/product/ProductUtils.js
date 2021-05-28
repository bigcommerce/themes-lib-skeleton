import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import progressButton from '../utils/progressButton';
import FormValidator from '../utils/FormValidator';
import AttributesHelper from './AttributesHelper';

/**
 * PxU's handler for a couple product-related ajax features.
 * ---------------------------------------------------------
 *
 * lodash templating:
 * ------------------
 *   Updates to product pricing are handled by lodash's templating engine https://lodash.com/docs#template.
 *   Product pricing markup and logic in price.html should therefore be mirrored in productViewTemplates.js
 *
 * callbacks:
 * ----------
 *   willUpdate:   executed on product form submission.
 *                   passes a jQuery object of the product options form
 *
 *   didUpdate:    executed on product cart request response.
 *                   passes as arguments:
 *                   {boolean} isError  - whether or not the request was successful
 *                   {object}  response - response data from Bigcommerce
 *                   {jQuery}  $form    - the product options form jQuery element
 *
 *   switchImage:  executed on product variation change if and when the returned set of options has an image associated.
 *                   passes the url of the image. The code as it stands assumes a configured 'product' image size in config.json
 *
 */

export default class ProductUtils {
  constructor(el, options) {
    this.$el = $(el);
    this.options = options;
    this.$body = $(document.body);
    this.$form = this.$el.find('form[data-cart-item-add]');
    this.productId = this.$el.find('[data-product-id]').val();
    this.productAttributesData = window.BCData.product_attributes;

    // class to add or remove from cart-add button depending on variation availability
    this.buttonDisabledClass = 'button-disabled';

    // two alert locations based on action
    this.cartAddAlert = new Alert(this.$body.find('[data-product-cart-message]'));
    this.cartOptionAlert = new Alert(this.$el.find('[data-product-option-message]'));
    this.attributesHelper = new AttributesHelper(el);

    this.callbacks = $.extend({
      willUpdate: () => {},
      didUpdate: () => {},
      switchImage: () => {},
      originalImage: () => {},
    }, options.callbacks);
  }

  /**
   * pass in the page context and bind events
   */
  init(context) {
    this.context = context;
    const $productOptionsElement = $('[data-product-option-change]', this.$form);
    const hasOptions = $productOptionsElement.length > 0 ? true : false;
    const hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
     if (hasDefaultOptions || (_.isEmpty(this.productAttributesData) && hasOptions)) {
      const $productId = $('[name="product_id"]', this.$form).val();
      utils.api.productAttributes.optionChange($productId, this.$form.serialize(), (err, response) => {
        const attributesData = response.data || {};
        const attributesContent = response.content || {};
        this.attributesHelper.updateAttributes(attributesData);
      });
    } else {
      this.attributesHelper.updateAttributes(this.productAttributesData);
    }

    this._bindProductOptionChange();

    this._boundCartCallback = this._bindCartAdd.bind(this);
    utils.hooks.on('cart-item-add', this._boundCartCallback);

    // Trigger a change event so the values are correct for pre-selected options
    $('[data-cart-item-add]').find('input[type="radio"], input[type="checkbox"], select').first().change();

    this.attributesHelper.updateAttributes(window.BCData.product_attributes);
  }

  /**
   *
   * Cleanup - useful for closing quickshop modals
   *
   */
  destroy() {
    utils.hooks.off('cart-item-add', this._boundCartCallback);
  }

  /**
   * Cache an object of jQuery elements for DOM updating
   * @param  jQuery $el - a wrapping element of the scoped product
   * @return {object} - buncha jQuery elements which may or may not exist on the page
   */
  _getViewModel($el) {
    return {
      $price: $('[data-product-price-wrapper="without-tax"]', $el),
      $priceWithTax: $('[data-product-price-wrapper="with-tax"]', $el),
      $saved: $('[data-product-price-saved]', $el),
      $sku: $('[data-product-sku]', $el),
      $weight: $('[data-product-weight]', $el),
      $addToCart: $('[data-button-purchase]', $el),
      stock: {
        $selector: $('[data-product-stock]', $el),
        $level: $('[data-product-stock-level]', $el),
      },
    };
  }

  /**
  * https://stackoverflow.com/questions/49672992/ajax-request-fails-when-sending-formdata-including-empty-file-input-in-safari
  * Safari browser with jquery 3.3.1 has an issue uploading empty file parameters. This function removes any empty files from the form params
  * @param formData: FormData object
  * @returns FormData object
  */
  filterEmptyFilesFromForm(formData) {
    try {
      for (const [key, val] of formData) {
        if (val instanceof File && !val.name && !val.size) {
          formData.delete(key);
        }
      }
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
    return formData;
  }

  /**
   * Bind product options changes.
   */
  _bindProductOptionChange() {
    utils.hooks.on('product-option-change', (event, changedOption) => {
      const $changedOption = $(changedOption);
      const $form = $changedOption.parents('form');

      // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
      if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
        return;
      }

      this.cartAddAlert.clear();
      this.cartOptionAlert.clear();

      utils.api.productAttributes.optionChange(this.productId, $form.serialize(), (err, response) => {
        this.cartAddAlert.clear();

        // If our form data doesn't include the product-options-count with a positive value, return
        if (this.$el.find('[data-product-options-count]').val < 1) {
          return;
        }

        const productAttributesData = response.data || {};
        const productAttributesContent = response.content || {};

        this.attributesHelper.updateAttributes(productAttributesData);
        this._updateView(productAttributesData);
        this.setProductVariant();
      });
    });
  }

  _updateView(data) {
    const viewModel = this._getViewModel(this.$el);

    // updating price
    if (data.price && viewModel.$price.length) {
      const priceStrings = {
        price: data.price,
        excludingTax: this.context.productExcludingTax,
        savedString: this.context.productYouSave,
        salePriceLabel: this.context.salePriceLabel,
        nonSalePriceLabel: this.context.nonSalePriceLabel,
        retailPriceLabel: this.context.retailPriceLabel,
        priceLabel: this.context.priceLabel,
      };
      viewModel.$price.html(this.options.priceWithoutTaxTemplate(priceStrings));
    }

    if (data.price && viewModel.$priceWithTax.length) {
      const priceStrings = {
        price: data.price,
        includingTax: this.context.productIncludingTax,
        savedString: this.context.productYouSave,
        salePriceLabel: this.context.salePriceLabel,
        nonSalePriceLabel: this.context.nonSalePriceLabel,
        retailPriceLabel: this.context.retailPriceLabel,
        priceLabel: this.context.priceLabel,
      };
      viewModel.$priceWithTax.html(this.options.priceWithTaxTemplate(priceStrings));
    }

    if (data.price && viewModel.$saved.length) {
      const priceStrings = {
        price: data.price,
        savedString: this.context.productYouSave,
      };

      if(data.price.saved){
        priceStrings.savedString = this.context.productYouSave.replace('{amount}', data.price.saved.formatted);
      }

      viewModel.$saved.html(this.options.priceSavedTemplate(priceStrings));
    }

    // stock
    if (data.stock) {
      viewModel.stock.$selector.removeClass('product-details-hidden');
      viewModel.stock.$level.text(data.stock);
    } else {
      viewModel.stock.$level.text('0');
    }

    // update sku if exists
    if (data.sku && viewModel.$sku.length) {
      viewModel.$sku.html(data.sku);
    }

    // update weight if exists
    if (data.weight && viewModel.$weight.length) {
      viewModel.$weight.html(data.weight.formatted);
    }

    // handle product variant image if exists
    if (data.image) {
      this.callbacks.switchImage(data.image);
    } else {
      this.callbacks.originalImage();
    }

    // update submit button state
    if (!data.purchasable || !data.instock) {
      this.cartOptionAlert.error(data.purchasing_message || this.context.productOptionUnavailable, true);
      viewModel.$addToCart
        .addClass(this.buttonDisabledClass)
        .prop('disabled', true);
    } else {
      viewModel.$addToCart
        .removeClass(this.buttonDisabledClass)
        .prop('disabled', false);
    }
  }

  /**
   * Add a product to cart
   */
  _bindCartAdd(event, form) {
    // Do not do AJAX if browser doesn't support FormData
    if (window.FormData === undefined) { return; }

    event.preventDefault();

    const $button = $(event.currentTarget)
      .closest('[data-product-container]')
      .find('[data-button-purchase]');

    const quantity = this.$el.find('input.product-quantity').val();
    const formData = new FormData(form);

    // update button state
    progressButton.progress($button);

    this.callbacks.willUpdate($(form));

    // Remove old alters
    this.cartAddAlert.clear();
    this.cartOptionAlert.clear();

    // Add item to cart
    utils.api.cart.itemAdd(this.filterEmptyFilesFromForm(formData), (err, response) => {
      let isError = false;

      if (err || response.data.error) {
        isError = true;
        response = err || response.data.error;
        progressButton.complete($button);
      } else {
        progressButton.confirmComplete($button);
      }

      /**
       * interpret and display cart-add response message
       */
      this.context.productTitle = $button.attr('data-product-title');
      this._updateMessage(isError, response);

      this.callbacks.didUpdate(isError, response, $(form));
    });
  }

  /**
   * interpret and display cart-add response message
   */
  _updateMessage(isError, response) {
    let message = '';

    if (isError) {
      message = response;
    } else {
      message = this.context.addSuccess;
      message = message
                  .replace('*product*', this.$el.find('[data-product-details]').data('product-title'))
                  .replace('*cart_link*', `<a href=${this.context.urlsCart}>${this.context.cartLink}</a>`)
                  .replace('*checkout_link*', `<a href=${this.context.urlsCheckout}>${this.context.checkoutLink}</a>`);
    }

    this.cartAddAlert.message(message, (isError ? 'error' : 'success'), true);

    setTimeout(() => {
      this.cartAddAlert.clear();
    }, 6000);
  }

  setProductVariant() {
    const unsatisfiedRequiredFields = [];
    const options = [];

    $.each($('[data-product-attribute]'), (index, value) => {
      const optionLabel = value.children[0].innerText;
      const optionTitle = optionLabel.split(':')[0].trim();
      const required = optionLabel.toLowerCase().includes('required');
      const type = value.getAttribute('data-product-attribute');

      if (
        (type === 'input-file' || type === 'input-text' || type === 'input-number')
        && value.querySelector('input').value === '' && required
      ) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'date') {
        const isSatisfied = Array.from(value.querySelectorAll('select')).every((select) => select.selectedIndex !== 0);

        if (isSatisfied) {
          const dateString = Array.from(value.querySelectorAll('select')).map((x) => x.value).join('-');
          options.push(`${optionTitle}:${dateString}`);
          return;
        }

        if (required) {
            unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-select') {
        const select = value.querySelector('select');
        const selectedIndex = select.selectedIndex;

        if (selectedIndex !== 0) {
          options.push(`${optionTitle}:${select.options[selectedIndex].innerText}`);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (
        type === 'set-rectangle'
        || type === 'set-radio'
        || type === 'swatch'
        || type === 'input-checkbox'
        || type === 'product-list'
      ) {
        const checked = value.querySelector(':checked');
        if (checked) {
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            const label = checked.labels[0].innerText;

            if (label) {
              options.push(`${optionTitle}:${label}`);
            }
          }

          if (type === 'swatch') {
            const label = checked.labels[0].children[0];

            if (label) {
              options.push(`${optionTitle}:${label.title}`);
            }
          }

          if (type === 'input-checkbox') {
            options.push(`${optionTitle}:Yes`);
          }

          return;
        }

        if (type === 'input-checkbox') {
          options.push(`${optionTitle}:No`);
        }

        if (required) {
            unsatisfiedRequiredFields.push(value);
        }
      }
    });

    let productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    const view = $('.product-details-wrapper');

    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;

      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        const productName = view.find('.product-title')[0].innerText;
        const card = $(`[data-name="${productName}"]`);
        card.attr('data-product-variant', productVariant);
      }
    }
  }
}
