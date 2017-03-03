import _ from 'lodash';
import Filters from './Filters';
import Loading from 'bc-loading';
import Compare from 'bc-compare';
import Alert from '../components/Alert';

export default class Listing {
  /**
   * Manages product listings.
   *
   * This class glues together different components, taking care of any
   * theme-specifc logic and UI.
   */

  constructor(templateNamespace, frontmatter) {
    this.$body = $(document.body);
    this.$filters = $('[data-filters]');
    this.$filtersContainer = $('[data-filters-container]');
    this.$alerts = $('[data-product-grid-alerts]');

    this.templateNamespace = templateNamespace;
    this.filters = new Filters(frontmatter);
    this.alert = new Alert(this.$alerts);
    this.loader = new Loading({}, true);

    if ($('[data-product-compare]').length) {
      this._initCompare();
    }

    this._bindEvents();
  }

  _bindEvents() {
    // Update filters
    this.filters.addTemplate(`${this.templateNamespace}/filters`, (content) => {
      const wasVisible = this.$filters.is(':visible');

      const $newFilters = $(content).find('[data-filters]');
      this.$filters.replaceWith($newFilters);
      this.$filters = $newFilters;

      if (wasVisible) {
        this.$filters.show();
      }
    });

    // Update product listing
    this.filters.addTemplate(`${this.templateNamespace}/products`, (content) => {
      $('[data-listing-container]').replaceWith(content);
    });

    // Pagination links
    this.$body.on('click', '[data-listing-pagination-link]', (event) => {
      event.preventDefault();
      this._scrollToTop();

      // Update filter state
      const $el = $(event.currentTarget);
      const url = $el.attr('href');
      this.filters.updateState(url);
    });

    // Update pagination
    this.filters.addTemplate(`${this.templateNamespace}/pagination`, (content) => {
      $('[data-listing-pagination]').replaceWith(content);
    });

    // UI feedback

    this.filters.on('fetch', (state) => {
      this.loader.show();
    });

    this.filters.on('update', (state) => {
      this.loader.hide();
      this.alert.clear();
    });

    this.filters.on('error', (error, state) => {
      this.loader.hide();
      this.alert.error(error);
    });
  }

  _initCompare() {
    const compare = new Compare({
      maxItems: 3,
      itemTemplate: _.template(`
        <div class="compare-item" data-compare-item>
          <a href="<%= url %>">
            <img class="compare-item-thumbnail" src="<%= thumbnail %>"/>
            <div class="compare-item-title"><%= title %></div>
          </a>
          <button class="compare-item-remove" data-compare-item-remove="<%= id %>">&times;</button>
        </div>
      `),
    });

    compare.on('beforeadd', (id) => {
      console.log('compare before add');
    });

    compare.on('afteradd', (id) => {
      console.log('compare after add');
      console.log(`${compare.compareList.get(id).title} added to compare`);
    });

    compare.on('beforeremove', (id) => {
      console.log('compare before remove');
    });

    compare.on('afterremove', (id) => {
      console.log('compare after remove');
    });

    compare.on('updated', () => {
      console.log('compare updated');
      $('.compare-title span').text(compare.compareList.size);

      if (compare.compareList.size > 0) {
        $('[data-compare-widget]').show();
      } else {
        $('[data-compare-widget]').hide();
      }
    }, true);

    $('[data-compare-remove-all]').on('click', () => {
      compare.removeAll();
    });
  }

  _scrollToTop() {
    const scrollTop = $('[data-listing-container]').offset().top;
    $('html,body').animate({ scrollTop });
  }

  unload() {
    //remove all event handlers
  }
}
