# UPS shipping method in shipping estimator

Added: 2016-04-21

Control Panel: `Store Setup > Shipping > (configured country) > Edit > UPS`

Bigcommerce expects UPS rates to surface alongside standard rates when configured from the cart page.

UPS shipping methods vary from normal shipping methods in that they have a `description` and a `logo_path`. `provider_name` is just "UPS" in this case, and `description` is the name of the actual method.

## Template

```handlebars
<!-- templates/components/cart/shipping-quotes.html -->

{{#each quotes.shipping_methods}}
  <div>
    <label>
      <input id="shipping-quote-{{id}}" type="radio" name="shipping_method" value="{{id}}">
      <span>{{provider_name}} - {{cost.formatted}}</span>
    </label>
  </div>
{{/each}}

{{#each quotes.ups_shipping_methods}}
  <div>
    <label>
      <input id="shipping-quote-{{id}}" type="radio" name="shipping_method" value="{{id}}">
      <span>
        {{#if logo_path}}
          <img src="{{logo_path}}" alt="{{description}}">
        {{/if}}
        {{description}} - {{cost.formatted}}
      </span>
    </label>
  </div>
{{/each}}

```
