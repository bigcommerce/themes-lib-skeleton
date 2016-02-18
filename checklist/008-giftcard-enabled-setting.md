# Show/hide gift certificates setting

Added: 2016-02-15

Affects: `cart.html`, `header.html`, `footer.html`

Control Panel: `Marketing > Gift Certificates > Gift Certificate Settings`

Any references to gift certificates should be hidden if `settings.gift_certificates_enabled` is false.

```handlebars
{{#if settings.gift_certificates_enabled}}
  <form method="post" action="{{urls.cart}}" ...>
      <input name="certcode" ...>
      <input type="submit" ...>
      <input type="hidden" name="action" value="applycoupon">
  </form>
{{/if}}
```
