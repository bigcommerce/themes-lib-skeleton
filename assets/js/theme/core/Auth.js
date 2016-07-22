import PageManager from '../../PageManager';
import updateState from './updateState';

export default class Account extends PageManager {
  loaded() {
    updateState(false, this.selectWrapCallback);
  }

  /**
   * Optional callback fired when a fresh state <select> element is added to the DOM
   */
  selectWrapCallback($selectEl) {} //eslint-disable-line no-unused-vars
}
