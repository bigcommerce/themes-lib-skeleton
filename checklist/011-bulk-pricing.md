# Bulk Pricing on Product Page

Added: 2016-02-29

Affects: `pages/product.html`

Control Panel: `Edit Product > Bulk Pricing`

When bulk pricing rules are configured, Merchants expect this info to surface on the product page.

## Template

```handlebars
/pages/product.html

{{#if product.bulk_discount_rates.length}}
  <div class="product-bulk-pricing">
    <h2 class="bulk-pricing-heading">{{lang 'product.bulk_pricing.title'}}</h2>
    <ul>
      {{#each product.bulk_discount_rates}}
        <li>
          {{lang 'product.bulk_pricing.range' min=min max=max}}
          {{#if type '===' 'percent'}}
            {{{lang 'product.bulk_pricing.percent' discount=discount.formatted}}}
          {{/if}}
          {{#if type '===' 'fixed'}}
            {{{lang 'product.bulk_pricing.fixed' discount=discount.formatted}}}
          {{/if}}
          {{#if type '===' 'price'}}
            {{{lang 'product.bulk_pricing.price' discount=discount.formatted}}}
          {{/if}}
        </li>
      {{/each}}
    </ul>
  </div>
{{/if}}

```

## Language

```json
{
  "product": {
    ...
    "bulk_pricing":
      "title": "Bulk Pricing Available",
      "range": "Buy {min}{max, plural, =0{or above} other {—#}}",
      "percent": "and get {discount} off",
      "price": "and get {discount} off",
      "fixed": "and pay only {discount} each"
    }
  }
}

```
