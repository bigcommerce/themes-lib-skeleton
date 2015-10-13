import PageManager from '../PageManager';
import FacetedSearch from './components/FacetedSearch';
import Loading from 'bc-loading';

export default class Category extends PageManager {
  constructor() {
    super();

    const loadingOptions = {
      loadingMarkup: '<div class="loading"><span class="loading-spinner"></span></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };

    if ($('[data-faceted-search]').length) {
      this._initializeFacetedSearch();
      this.sidebarOverlay = new Loading(loadingOptions, true, '[data-category-sidebar]');
    }
  }

  _initializeFacetedSearch() {
    const facetedSearchOptions = {
      callbacks: {
        willUpdate: () => this.sidebarOverlay.show(),
        didUpdate: () => this.sidebarOverlay.hide(),
      }
    };

    new FacetedSearch(facetedSearchOptions);
  }
}