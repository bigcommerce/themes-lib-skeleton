import PageManager from '../PageManager';
import Carousel from './components/Carousel';

export default class Home extends PageManager {
  constructor() {
    super();
  }

  loaded(next) {
    this.Carousel = new Carousel();
    next();
  }
}
