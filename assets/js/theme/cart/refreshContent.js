import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';

export default function(didUpdate, remove) {
  const $cartTotals = $('[data-cart-totals]');
  const $cartContent = $('[data-cart-content]');
  const $cartItem = $('[data-cart-item]', $cartContent);
  const options = {
    template: {
      content: 'cart/content',
      totals: 'cart/totals',
    },
  };

  // Remove last item from cart? Reload
  if (remove && $cartItem.length === 1) {
    return window.location.reload();
  }

  utils.api.cart.getContent(options, (err, response) => {
    // TODO: Scope the call to this function by area that needs updating
    $cartContent.html(response.content);
    $cartTotals.html(response.totals);
    $cartContent.trigger('cart-initialize-modules');

    // TODO: If the loading overlay is scoped to an area that is replaced
    // it does not fade out, but is removed abrubtly (due to being a
    // part of that area's content).
    didUpdate();
  });
}
