import PageManager from '../PageManager';
import { api } from '@bigcommerce/stencil-utils';
import Loading from 'bc-loading';
import ProductCompare from 'bc-compare';
import loadingOptions from './utils/loadingOptions';

export default class Compare extends PageManager {
  constructor() {
    super();

    this._init();

    this.loading = new Loading(loadingOptions, true, '.compare-grid-wrapper');

    // Init compare with blank template so we can
    // remove items from sessionStorage when they
    // are removed on this page.
    this.compare = new ProductCompare({itemTemplate: () => {}});

    this._bindRemove();
  }

  _init() {
    $('.compare-grid-item-header').equalizeHeights();
    $('.compare-grid-summary').equalizeHeights();
  }

  _bindRemove() {
    this.compare.on('afterremove', (id) => {
      const removeUrl = $(`[data-compare-item-remove="${id}"]`).attr('href');

      this.loading.show();

      api.getPage(removeUrl, {
        template: 'compare/compare-grid',
      }, (err, response) => {
        if (err) {
          throw new Error(err);
        }

        this.loading.hide();

        history.replaceState(null, document.title, removeUrl);

        $('.compare-grid').replaceWith(response);

        this._init();
      });
    });
  }
}
