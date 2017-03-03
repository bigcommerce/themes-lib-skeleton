import $ from 'jquery';
import CurrencySelector from './components/CurrencySelector';
import SelectWrapper from './components/SelectWrapper';
import FormValidator from './utils/FormValidator';
import formSelectedValue from './core/formSelectedValue';

// global scope jQuery plugins
/* eslint-disable no-unused-vars */
import validetta from 'validetta';

export default class Global {
  constructor(context) {
    this.context = context;
    new CurrencySelector('[data-currency-switcher]');

    const $select = $('select');
    if ($select.length) {
      $select.each((i, el) => {
        new SelectWrapper(el);
      });
    }

    formSelectedValue();

    // global form validation
    this.validator = new FormValidator(this.context);
    this.validator.initGlobal();
  }

  unload() {
    //remove all event handlers
  }
}
