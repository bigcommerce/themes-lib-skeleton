import PageManager from '../page-manager';
import FacetedSearch from './components/faceted-search';
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
      config: {
        category: {
          shop_by_price: true,
        },
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar',
      },
    };

    const facetedSearch = new FacetedSearch(facetedSearchOptions, {
      willUpdate: () => this.sidebarOverlay.show(),
      didUpdate: () => this.sidebarOverlay.hide(),
    });
  }
}
