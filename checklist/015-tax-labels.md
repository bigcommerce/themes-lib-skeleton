# Tax Label Display Logic

Added: 2016-03-07

Affects: `components/product/price.html`

Control Panel: `Settings > Tax > Configure Tax Display Settings`

When a merchant configures their shop to show prices both including and excluding tax, the labels `Incl Tax` and `Excl Tax` should show. Otherwise the labels shouldn't show.

## Template

```handlebars
<!-- components/product/price -->
<div>
  {{#if price.without_tax}}
    <div class="product-price-line">
      <span class="price-value">{{price.without_tax.formatted}}</span>

      {{#if price.with_tax}}
        <span class="price-tax-label"> {{lang 'product.excluding_tax'}}</span>
      {{/if}}
    </div>
  {{/if}}

  {{#if price.with_tax}}
    <div class="product-price-line" data-product-price-wrapper="with-tax">
      <span class="price-value"> {{price.with_tax.formatted}}</span>

      {{#if price.without_tax}}
        <span class="price-tax-label"> {{lang 'product.including_tax'}}</span>
      {{/if}}
    </div>
  {{/if}}
</div>
```
