# Account for only one currency being enabled in a shop

Added: 2016-03-08

Control Panel: `Settings > Currencies`

If a merchant has only one currency selected, we shouldn't be giving customers a select input.

## Template

```handlebars
{{#if currency_selector.currencies.length ">" 1}}
  <div class="form-select-wrapper nav-currency-selector">
    <span>{{currency_selector.active_currency_name}}</span>
    <select data-currency-selector>
      {{#each currency_selector.currencies}}
        <option value="{{{switch_url}}}" {{#if is_active}}selected{{/if}}>
          {{name}}
        </option>
      {{/each}}
    </select>
  </div>
{{else}}
  <div class="currency-selector-no-choice">
    All prices listed in {{currency_selector.active_currency_code}}.
  </div>
{{/if}}
```
