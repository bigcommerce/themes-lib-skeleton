import Listing from './listing/Listing';

export default class Category {
  constructor(context) {
    this.context = context;
    this.listing = new Listing('category', {
      category: { products: { limit: this.context.listingProductCount } },
    });
  }

  unload() {
    //remove all event handlers
  }
}
