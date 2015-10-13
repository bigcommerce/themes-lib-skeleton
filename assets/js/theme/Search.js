import PageManager from '../PageManager';
import FacetedSearch from './components/FacetedSearch';
import Loading from 'bc-loading';

export default class Search extends PageManager {
  constructor() {
    super();

    if ($('[data-faceted-search]').length) {
      this._initializeFacetedSearch();
    }
  }

  _initializeFacetedSearch() {
    const facetedSearchOptions = {
      template: {
        productListing: 'search/product-listing',
        sidebar: 'search/sidebar',
      },
      scope: {
        productListing: '[data-search]',
        sidebar: '[data-search-sidebar]',
      },
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // }
    };

    new FacetedSearch(facetedSearchOptions);
  }
}
