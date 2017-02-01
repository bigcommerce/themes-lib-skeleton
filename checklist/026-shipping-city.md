# City input in the cart shipping estimator

Added: 2017-01-31

Apps like ShipperHQ require a city field in order to estimate accurately.

Cornerstone added a city field early 2016. Here's a link to their diff:
https://github.com/bigcommerce/stencil/commit/6bf7054cae2c7ee4ca7e9c86c12959ee13162926

1. Add new [name="shipping-city"] input to shipping estimator for city (_consult a designer if it affects the layout!_)
2. Ensure the new value is pulled into the `params` object when fetching new quotes

## Template

```handlebars
<!-- templates/components/cart/shipping-calculator.html -->

<div class="form-field form-field-small calculator-field-city">
  <label class="form-label" for="shipping-city">{{lang 'cart.shipping_calculator.select_a_city'}}</label>
  <input class="form-input" type="text" id="shipping-city" name="shipping-city" value="{{selected_city}}" placeholder="{{lang 'cart.shipping_calculator.select_a_city'}}">
</div>
```

### Javascript

```javascript
_calculateShipping(event) {

  //..

  const params = {
    country_id: $('[name="shipping-country"]', this.$cartFooter).val(),
    state_id: $('[name="shipping-state"]', this.$cartFooter).val(),
    city: $('[name="shipping-city"]', this.$cartFooter).val(), // <--
    zip_code: $('[name="shipping-zip"]', this.$cartFooter).val(),
  };

  //..
```
