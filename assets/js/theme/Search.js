import PageManager from '../PageManager';
import Listing from './listing/Listing';

export default class Search extends PageManager {
  loaded(next) {
    this.listing = new Listing('search', {
      product_results: { limit: this.context.listingProductCount },
    });

    next();
  }
}
