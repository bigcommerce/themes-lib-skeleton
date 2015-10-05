import $ from 'jquery';
import PageManager from '../page-manager';
import CurrencySelector from './components/currency-selector';
import SelectWrapper from './components/select-wrapper';

export default class Global extends PageManager {
  constructor() {
    super();

    new CurrencySelector('[data-currency-switcher]');

    const $select = $('select');
    if ($select.length) {
      $select.each((i, el) => {
        new SelectWrapper(el);
      });
    }
  }
}
