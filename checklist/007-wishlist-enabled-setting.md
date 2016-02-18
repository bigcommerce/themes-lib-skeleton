# Show/hide wishlist setting

Added: 2016-02-15

Affects: `product.html`, `header.html`, `footer.html`

Control Panel: `Settings > Store Settings > Display > Display Settings`

Any reference to wishlists should be hidden if `settings.show_wishlist` is false.

```handlebars
{{#if settings.show_wishlist}}
  <form ... method="post" action="{{product.add_to_wishlist_url}}" data-wishlist-add>
    <input type="hidden" name="variation_id" value="{{id}}">
    <input type="submit" ...>
  </form>
{{/if}}
```
