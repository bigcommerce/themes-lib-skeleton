import $ from 'jquery';
import PageManager from '../PageManager';
import CurrencySelector from './components/CurrencySelector';
import SelectWrapper from './components/SelectWrapper';

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
