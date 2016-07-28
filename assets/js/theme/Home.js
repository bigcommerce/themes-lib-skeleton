import $ from 'jquery';
import PageManager from '../PageManager';
import Carousel from 'bc-carousel';

export default class Home extends PageManager {
  constructor() {
    super();
  }

  loaded(next) {
    this.Carousel = new Carousel({
      el: $('.carousel'),
      delay: this.context.carouselDelay
    });
    next();
  }
}
