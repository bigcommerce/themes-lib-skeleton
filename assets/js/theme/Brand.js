import Listing from './listing/Listing';

export default class Brand {
  constructor(context) {
    this.context = context;

    this.listing = new Listing('brand', {
      brand: {products: {limit: this.context.listingProductCount}},
    });
  }

  unload() {
    //remove all event handlers
  }
}
