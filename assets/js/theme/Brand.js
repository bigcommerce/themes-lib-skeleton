import PageManager from '../PageManager';
import FacetedSearch from './components/FacetedSearch';
import Loading from 'bc-loading';

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
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // }
    };

    new FacetedSearch(facetedSearchOptions);
  }
}
