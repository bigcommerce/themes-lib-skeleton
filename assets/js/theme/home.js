import $ from 'jquery';
import PageManager from '../page-manager';
import Carousel from 'bc-carousel';

export default class Home extends PageManager {
    constructor() {
        super();

        new Carousel({
            el: $('.carousel'),
            delay: Theme.carouselDelay
        });
    }

    loaded(next) {
        next();
    }
}
