import PageManager from '../PageManager';
import Listing from './listing/Listing';

export default class Brand extends PageManager {
  loaded(next) {
    this.listing = new Listing('brand', {
      brand: { products: { limit: this.context.listingProductCount } },
    });

    next();
  }
}
