import { hooks, api } from 'bigcommerce/stencil-utils';
import $ from 'jquery';
import Url from 'url';
import 'history/scripts/bundled/html4+html5/jquery.history';

export default class FacetedSearch {
  constructor(options, callback) {
    this.callback = callback;
    this.$body = $(document.body);

    this.options = $.extend({
      config: {
        category: {
          shop_by_price: true
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      scope: {
        productListing: '[data-category]',
        sidebar: '[data-category-sidebar]',
      },
      facetToggle: '[data-facet-toggle]',
      moreToggle: '[data-facet-more]',
      toggleFacet: () => console.log('Facet toggled.'),
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this._bindEvents();
  }

  _bindEvents() {
    this.$body.on('click', this.options.facetToggle, (event) => {
      this._toggleFacet(event);
    });

    this.$body.on('click', this.options.moreToggle, (event) => {
      this._showAdditionalFilters(event);
    });

    $(window).on('statechange', this._onStateChange.bind(this));
    hooks.on('facetedSearch-facet-clicked', this._onFacetClick.bind(this));
    hooks.on('facetedSearch-range-submitted', this._onRangeSubmit.bind(this));
    hooks.on('sortBy-submitted', this._onSortBySubmit.bind(this));
  }

  _showAdditionalFilters(event) {
    event.preventDefault();

    $(event.currentTarget)
      .addClass('hidden')
      .parent('li')
      .siblings('li')
      .removeClass('hidden');
  }

  _toggleFacet(event) {
    this.options.toggleFacet(event);
  }

  _onFacetClick(event) {
    event.preventDefault();

    const $target = $(event.currentTarget);
    const url = $target.attr('href');

    this._goToUrl(url);
  }

  _onRangeSubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href);
    let queryParams = $(event.currentTarget).serialize();

    if (this.$body.hasClass('template-search')) {
      const currentSearch = `search_query=${$('[data-faceted-search]').data('search-query')}` || '';
      queryParams = `${queryParams}&${currentSearch}`;
    }

    this._goToUrl(Url.format({ pathname: url.pathname, search: '?' + queryParams }));
  }

  _onSortBySubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href, true);
    const queryParams = $(event.currentTarget).serialize().split('=');

    url.query[queryParams[0]] = queryParams[1];
    delete url.query['page'];

    this._goToUrl(Url.format({ pathname: url.pathname, query: url.query }));
  }

  _onStateChange(event) {
    this.callbacks.willUpdate();

    api.getPage(History.getState().url, this.options, (err, content) => {
      if (err) {
        throw new Error(err);
        this.callbacks.didUpdate();
        return;
      }

      if (content) {
        $(this.options.scope.productListing).html(content.productListing);
        $(this.options.scope.sidebar).html(content.sidebar);
        this.callbacks.didUpdate();
      }
    });
  }

  _goToUrl(url) {
    History.pushState({}, document.title, url);
  }
}
