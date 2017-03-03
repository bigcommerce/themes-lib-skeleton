import $ from 'jquery';
import PageManager from '../PageManager';
import Carousel from 'bc-carousel';

export default class Home {
  constructor(context) {
    this.context = context;

    this.Carousel = new Carousel({
      el: $('.carousel'),
      delay: this.context.carouselDelay
    });
  }
}
