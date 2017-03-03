import Listing from './listing/Listing';

export default class Search {
  constructor(context) {
    this.context = context;

    this.listing = new Listing('search', {
      product_results: {limit: this.context.listingProductCount},
    });
  }

  unload() {
    //remove all event handlers
  }
}
