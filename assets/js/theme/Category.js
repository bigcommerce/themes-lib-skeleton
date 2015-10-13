import PageManager from '../PageManager';
import FacetedSearch from './components/FacetedSearch';
import Loading from 'bc-loading';

export default class Category extends PageManager {
  constructor() {
    super();

    if ($('[data-faceted-search]').length) {
      this._initializeFacetedSearch();
    }
  }

  _initializeFacetedSearch() {
    const facetedSearchOptions = {
      // callbacks: {
      //   willUpdate: () => {},
      //   didUpdate: () => {},
      // }
    };

    new FacetedSearch(facetedSearchOptions);
  }
}
