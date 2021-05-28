import PageManager from '../PageManager';

export default class Blog extends PageManager {
  constructor() {
    super();

    this.$blogContent = $('[data-blog-index]');
  }
}
