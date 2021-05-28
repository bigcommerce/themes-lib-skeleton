export default class CustomTabs {
  constructor() {
    this._bindEvents();
  }

  _bindEvents() {
    $('body').on('click', '[data-tab-toggle]', this._onTabToggleClick.bind(this));
    $('body').on('click', '[data-tab-trigger]', this._onTabTriggerClick.bind(this));
    $(document.body).on('invalid-form-field', (event, data) => {
      this._selectTabForField(data.field);
    });
  }

  _onTabToggleClick(event) {
    event.preventDefault();
    const $tabToggle = $(event.currentTarget);
    const id = $tabToggle.data('tab-toggle');
    const groupId = $tabToggle.data('tab-group');
    const $tabToggles = $(`[data-tab-toggle][data-tab-group="${groupId}"]`);
    const $tabs = $(`[data-tab][data-tab-group="${groupId}"]`);
    const $tab = $(`[data-tab="${id}"][data-tab-group="${groupId}"]`);

    if (!$tab.length) return;

    $tabToggles.removeClass('tab-selected');
    $tabToggle.addClass('tab-selected');
    $tabs.removeClass('tab-selected');
    $tab.addClass('tab-selected');
  }

  _onTabTriggerClick(event) {
    event.preventDefault();
    const $tabTrigger = $(event.currentTarget);
    const id = $tabTrigger.data('tab-trigger');
    const groupId = $tabTrigger.data('tab-group');
    const $tabToggle = $(`[data-tab-toggle="${id}"][data-tab-group="${groupId}"]`);

    if (!$tabToggle) return;

    $tabToggle.trigger('click');
  }

  _selectTabForField(el) {
    const $tab = $(el).closest('[data-tab]');
    const id = $tab.data('tab');
    const groupId = $tab.data('tab-group');
    const $tabToggle = $(`[data-tab-toggle="${id}"][data-tab-group="${groupId}"]`);

    if (!$tabToggle) return;

    $tabToggle.trigger('click');
  }
}
