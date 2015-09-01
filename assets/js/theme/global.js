import $ from 'jquery';
import PageManager from '../page-manager';
import CurrencySelector from './components/currency-selector';

export default class Global extends PageManager {
  constructor() {
    super();

    new CurrencySelector('[data-currency-switcher]');
  }
}
