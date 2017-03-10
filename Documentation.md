#Product Details Documentation

(for components/product/details.html)

##Brand

```
{{#if product.brand.name}}
  {{#if product.brand.url}}
    <a href="{{product.brand.url}}">{{product.brand.name}}</a>
  {{else}}
    {{product.brand.name}}
  {{/if}}
{{/if}}
```

##Stock Level

```
{{#if product.stock_level.length}}
  {{product.stock_level}}
{{/if}}
```

##Condition

```
{{#if product.condition}}
  {{product.condition}}
{{/if}}
```

##Availability

```
{{#if product.availability}}
  {{product.availability}}
{{/if}}
```

##Gift Wrapping

```
{{#if product.gift_wrapping_available}}
  Display some sort of message saying that it is available.
{{/if}}
```

##Shipping

```
{{#if product.shipping}}
  {{#if product.shipping.calculated}}
    Message stating shipping is calculated later.
  {{else}}
    {{#if product.shipping.price '===' 0}}
      Message stating that shipping for this product is free.
    {{else}}
      {{#if product.shipping.fixed}}
        {{product.shipping.price.formatted}}
      {{/if}}
    {{/if}}
  {{/if}}
{{/if}}
```

##Custom fields

```
{{#each product.custom_fields}}
  {{name}}
  {{value}}
{{/each}}
```

##Warranty

```
{{#if product.warranty}}
  {{nl2br product.warranty}}
{{/if}}
```

##Bulk Pricing

```
{{#if product.bulk_discount_rates.length}}
  {{#each product.bulk_discount_rates}}
    Message stating the min and max product quantities for the particular price break.
    {{lang 'product.bulk_pricing.range' min=min max=max}}
    {{#if type "===" "percent"}}
      Message stating percent off.
      {{discount.formatted}}
    {{/if}}
    {{#if type "===" "fixed"}}
      Message stating amount off.
      {{discount.formatted}}
    {{/if}}
    {{#if type "===" "price"}}
      Message stating price. 
      {{discount.formatted}}
    {{/if}}
  {{/each}}
{{/if}}
```

##Wishlist form

```
{{#if customer}}
  <form class="form" method="post" action="{{product.add_to_wishlist_url}}">
    <input type="hidden" name="variation_id" value="">
    <input class="button button-secondary" type="submit" value="{{lang 'account.wishlists.add_item'}}">
  </form>
{{/if}}
```

##Release Date

```
{{#if product.release_date}}
  {{product.release_date}}
{{/if}}
```

##Description

```
{{#if product.description}}
  {{{product.description}}}
{{/if}}
```

##Videos

```
{{#if product.videos.featured}}
  {{#each product.videos.list}}
    <iframe src="https://www.youtube.com/embed/{{id}}?rel=0&showinfo=0&autohide=1" frameborder="0" allowfullscreen></iframe>
  {{/each}}
{{/if}}
```
