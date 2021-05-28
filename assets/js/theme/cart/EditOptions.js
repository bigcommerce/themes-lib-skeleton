import utils from '@bigcommerce/stencil-utils';
import Modal from 'bc-modal';
import AttributesHelper from '../product/AttributesHelper';
import initFormSwatch from '../core/formSelectedValue';
import SelectWrapper from '../components/SelectWrapper';

export default class CartEditOptions {
  constructor(context, callbacks) {
    this.context = context;
    this.el = '.cart-options-modal';
    this.$el = $('body').find(this.el);
    this.id = null;

    this.cartOptionsModal = new Modal({
      el: this.$el,
      modalClass: 'cart-options-modal',
      afterShow: ($modal) => {
        this._fetchProduct($modal, this.id);
      },
    });

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, callbacks);

    // Abstracted attributes functionality
    this.attributesHelper = new AttributesHelper('#CartEditProductFieldsForm');

    this._bindEvents();
  }

  _bindEvents() {
    $('body').on('click', '[data-item-edit]', (event) => {
      event.preventDefault();

      this.id = $(event.currentTarget).data('item-edit');

      if (!this.id) { return; }

      this.cartOptionsModal.open();
    });

    $('body').on('click', '[data-edit-options-close]', (event) => {
      this.cartOptionsModal.close();

    });

    $('body').on('submit', '#CartEditProductFieldsForm', () => {
      this.callbacks.willUpdate();
    });
  }

  /**
   * Run ajax fetch of product and add to modal. Bind product functionality and show the modal
   * @param {jQuery} $modal - the root (appended) modal element.
   * @param {string} $itemId - product id
   */
  _fetchProduct($modal, $itemID) {
    const options = {
      template: 'cart/edit-options',
    };

    utils.api.productAttributes.configureInCart($itemID, options, (err, response) => {
      $modal
        .find('.modal-content')
        .append(response.content)
        .find('.cart-edit-options')
        .addClass('cart-edit-options-visible');

      initFormSwatch();

      const $select = $modal.find('select');
      if ($select.length) {
        $select.each((i) => {
          new SelectWrapper($select.eq(i));
        });
      }

      this.cartOptionsModal.position();
      $modal.addClass('loaded');

      $modal.find('[data-swatch-selector] input:checked').click();

      utils.hooks.on('product-option-change', (event, option) => {
        this.callbacks.willUpdate();
        const $changedOption = $(option);
        const $form = $('#CartEditProductFieldsForm');
        const $submit = $('input[type="submit"]', $form);
        const $messageBox = $('[data-reconfigure-errors]');
        const item = $('[name="item_id"]', $form).attr('value');

        utils.api.productAttributes.optionChange(item, $form.serialize(), (err, result) => {
          const data = result.data || {};

          this.attributesHelper.updateAttributes(data);

          if (data.purchasing_message) {
            $($messageBox).html(data.purchasing_message);
            $submit.prop('disabled', true);
            $messageBox.show();
          } else {
            $submit.prop('disabled', false);
            $messageBox.hide();
          }

          if (!data.purchasable || !data.instock) {
            $submit.prop('disabled', true);
          } else {
            $submit.prop('disabled', false);
          }

         this.callbacks.didUpdate();
        })
      });

      utils.hooks.emit('product-option-change');
    })
  }
}
