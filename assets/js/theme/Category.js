import PageManager from '../PageManager';
import Listing from './listing/Listing';

export default class Category extends PageManager {
  loaded(next) {
    this.listing = new Listing('category', {
      category: { products: { limit: this.context.listingProductCount } },
    });

    next();
  }
}
