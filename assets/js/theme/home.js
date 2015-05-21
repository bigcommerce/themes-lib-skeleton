import $ from "jquery";
import PageManager from "../page-manager";
import Carousel from "./components/carousel";

export default class Home extends PageManager {
    constructor() {
        super();

        new Carousel({
            el: $(".carousel"),
            carouselDelay: Theme.carouselDelay
        });
    }

    loaded(next) {
        next();
    }
}
