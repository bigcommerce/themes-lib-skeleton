# Measurement units added to settings

Added: 2016-02-10

Affects: `product.html`

> The global Settings object now contains a `settings.measurements` object. Its child `length` and `weight` properties define units of measure, corresponding to control-panel options. (MERC-66)

```handlebars
{{#if product.weight}}
  {{product.weight}} {{settings.measurements.weight}}
{{/if}}

{{#if product.width}}
  {{product.width}} {{settings.measurements.length}}
{{/if}}

{{#if product.height}}
  {{product.height}} {{settings.measurements.length}}
{{/if}}

{{#if product.depth}}
  {{product.depth}} {{settings.measurements.length}}
{{/if}}
```
