import PageManager from '../PageManager';
import ProductCatalog from './catalog/ProductCatalog';
import CustomTabs from './common/Tabs';

export default class Search extends PageManager {
  constructor() {
    super();

    new CustomTabs();
  }

  loaded() {
    new ProductCatalog(this.context);
  }
}
