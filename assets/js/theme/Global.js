import $ from 'jquery';
import PageManager from '../PageManager';
import CurrencySelector from './components/CurrencySelector';
import SelectWrapper from './components/SelectWrapper';
import FormValidator from './utils/FormValidator';
import initFormSwatchFields from './core/formSelectedValue';

// global scope jQuery plugins
/* eslint-disable no-unused-vars */
//import validetta from 'jquery-validetta';

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

  loaded(next) {
    initFormSwatchFields();

    // global form validation
    this.validator = new FormValidator(this.context);
    this.validator.initGlobal();
  }
}
