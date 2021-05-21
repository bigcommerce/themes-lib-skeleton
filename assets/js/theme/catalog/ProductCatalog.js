import utils from '@bigcommerce/stencil-utils';
import _ from 'lodash';
import Loading from 'bc-loading';
import ProductCompare from 'bc-compare';
import FacetedSearch from '../catalog/FacetedSearch';
import Pagination from '../common/Pagination';
import loadingOptions from '../utils/loadingOptions';

export default class ProductCatalog {
  constructor(context, listType) {
    this.$body = $(document.body);
    this.context = context;
    this.listType = listType;
    this.productLimit = context.themeSettings.products_per_page;

    if ($('[data-product-compare]').length) {
      this._initCompare();
    }

    if ($('[data-faceted-search]').length) {
      this._initFacetedSearch();
    }

    if ($('[data-pagination]').length) {
      this._initializePagination(this.productLimit);
    }
  }

  _initCompare() {
    const toggleClass = 'is-open';
    const $toggle = $('.compare-widget-toggle');
    const $widget = $('[data-compare-widget]');
    const $items = $('.compare-widget-items-wrap');
    const compare = new ProductCompare({
      scope: '[data-product-compare]',
      maxItems: 3,
      itemTemplate: _.template(`
        <div
          class="compare-product-item"
          data-compare-item
        >
          <div
            class="compare-widget-item-image"
            style="background-image: url(<%= thumbnail %>);"
          >
            <button
              class="compare-product-item-remove"
              data-compare-item-remove="<%= id %>"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-close" viewBox="0 0 16 16" data-compare-item-remove="<%= id %>">
                <g fill-rule="evenodd">
                  <path d="M1.533 15.455c-.192 0-.384-.073-.53-.22-.293-.293-.293-.77 0-1.062l13.17-13.17c.294-.294.77-.294 1.062 0 .293.292.293.767 0 1.06L2.063 15.235c-.146.147-.338.22-.53.22z"/>
                  <path d="M14.704 15.455c-.192 0-.384-.073-.53-.22L1.002 2.065c-.293-.294-.293-.77 0-1.062.293-.293.768-.293 1.06 0l13.172 13.17c.293.294.293.77 0 1.063-.146.146-.338.22-.53.22z"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
      `),
    });

    compare.on('updated', () => {
      const count = compare.compareList.size;

      if (count > 0) {
        $widget
          .revealer('show')
          .attr('aria-hidden', false);

        $items.hide();
      } else {
        $widget
          .revealer('hide')
          .attr('aria-hidden', true);

        $toggle.removeClass(toggleClass);
        $items.hide();
      }

      $widget
        .find('[data-compare-link]')
        .toggleClass('button-disabled', count === 1);

      $widget
        .attr('data-compare-count', count)
        .find('.compare-count')
        .text(count);

      this.$body.toggleClass('compare-active', count > 0);
    }, true);

    $('[data-compare-remove-all]').on('click', () => {
      compare.removeAll();
    });

    $('.compare-widget-toggle').on('click', () => {
      $toggle.toggleClass(toggleClass);
      $items.slideToggle('fast');
    });
  }

  _initFacetedSearch() {
    const options = {
      config: {
        category: {
          products: {
            limit: this.productLimit,
          },
        },
        brand: {
          products: {
            limit: this.productLimit,
          },
        },
        product_results: {
          limit: this.productLimit,
        },
      },
      showMore: 'faceted-search/show-more',
    };

    new FacetedSearch(options);
  }

  _initializePagination(productsPerPage) {
    const template = 'product-catalog/catalog-index';
    const paginationID = 0;
    const contentContainer = '.catalog-products';
    const requestOptions = {
      config: {
        category: {
          products: {
            limit: this.productLimit,
          },
        },
        brand: {
          products: {
            limit: this.productLimit,
          },
        },
        product_results: {
          limit: this.productLimit,
        },
      },
      template: template,
    };
    const options = {
      pagination_id: paginationID,
    };

    new Pagination(requestOptions, options);
  }
}
