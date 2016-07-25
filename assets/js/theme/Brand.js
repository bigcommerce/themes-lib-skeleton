import PageManager from '../PageManager';
import FacetedSearch from './components/FacetedSearch';
//TODO import Loading from 'bc-loading';

export default class Brand extends PageManager {
  constructor() {
    super();

    if ($('[data-faceted-search]').length) {
      this._initializeFacetedSearch();
    }
  }

  _initializeFacetedSearch() {
    const facetedSearchOptions = {
      template: {
        productListing: 'brand/product-listing',
        sidebar: 'brand/sidebar',
      },
      scope: {
        productListing: '[data-brand]',
        sidebar: '[data-brand-sidebar]',
      },
      toggleFacet: (event) => this._toggleFacet(event),
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // }
    };

    new FacetedSearch(facetedSearchOptions);
  }

  _toggleFacet(event) {
    const $target = $(event.currentTarget);
    $target
      .parents('[data-facet-filter]')
      .children('[data-facet-filter-wrapper]')
      .toggleClass('is-open');

    if ($target.hasClass('is-open')) {
      $target.text('-');
    } else {
      $target.text('+');
    }

    $target.toggleClass('is-open');
  }
}
