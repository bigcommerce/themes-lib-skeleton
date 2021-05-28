import CoreAccount from './core/Account';
import SelectWrapper from './components/SelectWrapper';

export default class Account extends CoreAccount {
  selectWrapCallback($selectEl) {
    // -- This select bubbles up from /core/Account.js -- //
    new SelectWrapper($selectEl);
  }
}
