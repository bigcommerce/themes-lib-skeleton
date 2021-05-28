import { hooks, api } from '@bigcommerce/stencil-utils';
import SelectWrapper from '../components/SelectWrapper';
import Loading from 'bc-loading';
import loadingOptions from '../utils/loadingOptions';
import Url from 'url';
import 'history.js/scripts/bundled-uncompressed/html4+html5/jquery.history';

export default class FacetedSearch {
  constructor(options) {
    this.$body = $(document.body);
    this.facetedSearchFlag = false;
    this.$facetContainer = $('[data-faceted-search]');
    this.loading = new Loading(loadingOptions, false, '.catalog-content');
    this.sidebarLoading = new Loading(loadingOptions, false, '.catalog-sidebar');

    this.options = $.extend(true, {
      config: {
        category: {
          shop_by_price: true,
        },
      },
      template: 'product-catalog/catalog-index',
      facetToggle: '[data-facet-toggle]',
      scope: '[data-facet-content]',
      moreToggle: '[data-facet-more]',
      toggleFacet: () => console.log('Facet toggled.'),
    }, options);
    this._bindEvents();
  }

  _bindEvents() {
    this.$body.on('click', '[data-facet-toggle]', (event) => {
      this._toggleFacet($(event.currentTarget));
    });

    this.$body.on('click', this.options.moreToggle, (event) => {
      event.preventDefault();
      this._showAdditionalFilters($(event.currentTarget));
    });

    this.$body.on('click', '[data-facet-panel-toggle]', (event) => {
      event.preventDefault();
      this._toggleMobileFacetDisplay($(event.currentTarget));
    });

    $(window).on('statechange', this._onStateChange.bind(this));
    hooks.on('facetedSearch-facet-clicked', this._onFacetClick.bind(this));
    hooks.on('facetedSearch-range-submitted', this._onRangeSubmit.bind(this));
    hooks.on('sortBy-submitted', this._onSortBySubmit.bind(this));
  }

  _toggleFacet($target) {
    // Handles opening / closing the facet blocks in the sidebar.
    const $wrapper = $target
      .parents('[data-facet-filter]')
      .children('[data-facet-filter-wrapper]');

    $target.toggleClass('is-open');

    if (!$wrapper.hasClass('visible')) {
      $wrapper.revealer('show');
      $('.facet-toggle-more').addClass('visible');
    } else {
      $wrapper.revealer('hide');
      $('.facet-toggle-more').removeClass('visible');
    }
  }

  _showAdditionalFilters($showMoreLink) {
    // Show/Hide extra facets based on settings for product filtering
    this.sidebarLoading.show();


    const $originalList = $($showMoreLink.siblings('.facet-default'));
    const facet = $showMoreLink.data('facet-more');
    const facetUrl = History.getState().url;

    if ($showMoreLink.siblings('.faceted-search-option-columns').length == 0) {
      if (this.options.showMore) {
        api.getPage(facetUrl, {
          template: this.options.showMore,
          params: {
            list_all: facet,
          },
        }, (err, response) => {
          if (err) {
            throw new Error(err);
          }
          $(response).insertAfter($originalList);
          $showMoreLink.siblings('.faceted-search-option-columns').toggle();
          this.sidebarLoading.hide();
        });
      }
    } else {
      $showMoreLink.siblings('.faceted-search-option-columns').toggle();
      this.sidebarLoading.hide();
    }

    // show/hide original facet list
    $originalList.toggle();

    // Toggle show more/less link
    $showMoreLink.children().toggle();

    return false;
  }

  _toggleMobileFacetDisplay($target) {
    $target.toggleClass('is-open').next().toggleClass('is-visible');
  }

  _onFacetClick(event) {
    event.preventDefault();

    const $target = $(event.currentTarget);
    const url = $target.attr('href');
    this.facetedSearchFlag = true;

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

    this.facetedSearchFlag = true;

    this._goToUrl(Url.format({ pathname: url.pathname, search: '?' + queryParams }));
  }

  _onSortBySubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href, true);
    const queryParams = $(event.currentTarget).serialize().split('=');

    url.query[queryParams[0]] = queryParams[1];
    delete url.query['page'];

    this.facetedSearchFlag = true;

    this._goToUrl(Url.format({ pathname: url.pathname, query: url.query }));
  }

  _onStateChange(event) {
    if (!this.facetedSearchFlag) return;
    this.loading.show();

    api.getPage(History.getState().url, this.options, (err, content) => {
      this.facetedSearchFlag = false;
      if (err) {
        throw new Error(err);
        this.loading.hide();
        return;
      }

      if (content) {
        $(this.options.scope).html(content);
        const $select = $('[data-sort-by] select');
        new SelectWrapper($select);
        this.loading.hide();
        $(window).scrollTop(0);

        if ($('[data-faceted-search]').hasClass('active-filters')) {
          $('[data-facet-remove-all]').addClass('visible');
        } else {
          $('[data-facet-remove-all]').removeClass('visible');
        }
      }
    });
  }

  _goToUrl(url) {
    History.pushState({}, document.title, url);
  }
}
