import $ from 'jquery';
import Url from 'url';
import stencil from '@bigcommerce/stencil-utils';
import EventEmitter from 'eventemitter2';
import 'history.js/scripts/bundled/html4+html5/jquery.history';
import '../global/array-find';

export default class Filters extends EventEmitter {
  /**
   * Handles everything to do with filtering/sorting a product listing.
   *
   * This shouldn't need to be modifed in each theme.
   */
  constructor(frontmatter) {
    super();

    this.$window = $(window);
    this.$body = $(document.body);

    this.frontmatter = frontmatter;
    this.templates = new TemplateRegistry();

    this._bindEvents();
  }

  /**
   * Add a template that should be fetched when changing filters.
   *
   * @param {string} template
   *        The path to the template file, inside of `templates/components`.
   *
   * @param {Filters~templateCallback} callback
   *        The function to be called whenever the template is fetched.
   */
  addTemplate(template, callback) {
    this.templates.addTemplateHandler(template, callback);
  }

  /**
   * A function called when a template has been fetched.
   *
   * @callback Filters~templateCallback
   *
   * @param {content}
   *        The rendered template.
   */

  /**
   * Update page with the content at a given URL.
   *
   * Triggers a `statechange` event.
   */
  updateState(url) {
    History.pushState({}, document.title, url);
  }

  _bindEvents() {
    // Filter change
    stencil.hooks.on('facetedSearch-facet-clicked', (event) => {
      event.preventDefault();
      const url = $(event.currentTarget).attr('href');
      this.updateState(url);
    });

    // Range filter change
    stencil.hooks.on('facetedSearch-range-submitted', (event) => {
      event.preventDefault();
      const url = this._urlForRange(event.currentTarget);
      this.updateState(url);
    });

    // Sort filter change
    stencil.hooks.on('sortBy-submitted', (event) => {
      event.preventDefault();
      const url = this._urlForSort(event.currentTarget);
      this.updateState(url);
    });

    // Facet clear
    this.$body.on('click', '.facet-selected-filter', (event) => {
      event.preventDefault();
      const url = $(event.currentTarget).attr('href');
      this.updateState(url);
    });

    // State change -- triggered when we call pushState
    this.$window.on('statechange', (event) => {
      this._renderState(History.getState());
    });
  }

  /**
   * Fetch new data to reflect state change, and update DOM.
   *
   * @param String url
   *        The URL for the new listing.
   *
   * @param Boolean replaceProducts (optional)
   *        True to replace current products with new ones. False to append.
   */
  _renderState(state) {
    this.emit('fetch', state);

    const template = this.templates.getTemplates();
    const requestOptions = { config:this.frontmatter, template };

    stencil.api.getPage(state.url, requestOptions, (error, response) => {
      if (error) {
        this.emit('error', error, state);
        return;
      }

      this.templates.handleResponse(template, response);
      this.emit('update', state);
    });
  }

  /**
   * Generate a URL for a range form.
   */
  _urlForRange(form) {
    const params = decodeURI($(form).serialize());
    const searchValue = Url.parse(location.href, true).query.search_query;
    const searchQuery = searchValue ? `&search_query=${searchValue}` : '';

    return Url.format({
      pathname: Url.parse(location.href).pathname,
      search: `?${params}${searchQuery}`,
    });
  }

  /**
   * Generate a URL for a sort form.
   */
  _urlForSort(form) {
    const url = Url.parse(location.href, true);

    // Get query params
    const params = $(form).serialize().split('=');
    const query = url.query;
    query[params[0]] = params[1];
    delete query.page;

    // Build query string
    let queryString = '';
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        if (Array.isArray(query[key])) {
          for (let index in query[key]) {
            if (query[key].hasOwnProperty(index)) {
              queryString += `&${key}=${query[key][index]}`;
            }
          }
        } else {
          queryString += `&${key}=${query[key]}`;
        }
      }
    }

    return Url.format({
      pathname: url.pathname,
      search: queryString.substring(1),
    });
  }
}

/**
 * Builds and manages a list of templates we want to fetch from stencil.
 */
class TemplateRegistry {
  constructor() {
    this.id = 0;
    this.templates = [];
  }

  /**
   * Register a function to be called when the template loads.
   *
   * This also makes sure that the template itself is requested when updating
   * the listing.
   *
   * @param {string} templatePath
   *        The path to the template file. The path is automatically prefixed
   *        with `templates/components/` by stencil.
   */
  addTemplateHandler(templatePath, handler) {
    const template = this.addTemplate(templatePath);
    template.handlers.push(handler);
  }

  /**
   * Fire registered callbacks when the listing is updated.
   *
   * @param templates
   *        Should be the same as the value returned by `getTemplates`.
   *
   * @param response
   *        The response from `stencil.api.getPage`.
   */
  handleResponse(templates, response) {
    // Single template
    if (typeof templates === 'string') {
      const template = this.getTemplateByPath(templates);
      if (template) this.handle(template.id, response);
    }

    // Multiple templates
    else {
      for (let templateId in templates) {
        this.handle(templateId, response[templateId]);
      }
    }
  }

  /**
   * Get a list of templates we need to fetch to satisfy our callbacks.
   *
   * @return {string|object}
   */
  getTemplates() {
    // Special case: stencil expects a string if only one template is being fetched
    if (this.templates.length === 1) {
      return this.templates[0].path;
    }

    // Otherwise, multiple templates are fetched with a hash of Id:Path pairs
    return this.templates.reduce((templates, template) => {
      templates[template.id] = template.path;
      return templates;
    }, {});
  }

  getTemplateByPath(path) {
    return this.templates.find(template => template.path === path);
  }

  getTemplateById(id) {
    return this.templates.find(template => template.id === id);
  }

  addTemplate(templatePath) {
    const existing = this.getTemplateByPath(templatePath);
    if (existing) return existing;

    const index = this.templates.push({
      id: this._generateId(),
      path: templatePath,
      handlers: [],
    });

    return this.templates[index - 1];
  }

  handle(templateId, ...args) {
    const template = this.getTemplateById(templateId);
    if (!template) return;

    template.handlers.forEach(handler => handler(...args));
  }

  _generateId() {
    return `template-${this.id++}`;
  }

  unload() {
    //remove all event handlers
  }
}
