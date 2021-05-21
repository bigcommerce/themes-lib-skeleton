import 'core-js/es/promise';
import PageManager from '../PageManager';
import './utils/themePlugins';
import modernizr from './utils/modernizr'
import CurrencySelector from './components/CurrencySelector';
import SelectWrapper from './components/SelectWrapper';
import FormValidator from './utils/FormValidator';
import Dropdown from './components/Dropdown';
import Banner from './components/Banner';
import MiniCart from './components/MiniCart';
import Header from './components/Header';
import './core/selectOption';

export default class Global extends PageManager {
  constructor() {
    super();

    new CurrencySelector('[data-currency-selector]');
    new Dropdown($('[data-dropdown]'));
    new Banner();
    new Header();
    new MiniCart();

    const $select = $('select');
    if ($select.length) {
      $select.each((i, el) => {
        new SelectWrapper(el);
      });
    }
  }

  loaded() {
    // Global form validation
    this.validator = new FormValidator(this.context);
    this.validator.initGlobal();
  }
}
