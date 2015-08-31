import $ from 'jquery';
import PageManager from '../page-manager';
import themeObject from './components/theme-object';
import currencySelector from './components/currency-selector';

export default class Global extends PageManager {
  constructor() {
    super();
  }

  /**
   * You can wrap the execution in this method with an asynchronous function map using the async library
   * if your components modules need async callback handling.
   * @param next
   */
  loaded(next) {
    currencySelector();
    next();
  }
}
