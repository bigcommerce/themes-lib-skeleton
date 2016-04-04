# Conditional quantity box

Added: 2016-03-30

Control Panel: `Settings > Display > Display Settings > "Show Quantity Box for Products"`

Merchants have the ability to hide the quantity box for products. If the quantity button is hidden, adding to cart should add only one item.

## Template

```handlebars
  {{#if product.show_quantity_input}}
    {{> components/products/quantity product}}
  {{/if}}
```
