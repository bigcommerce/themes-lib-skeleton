import $ from 'jquery';
import utils from 'bigcommerce/stencil-utils';

export default function(remove) {
  const $cartTotals = $('[data-cart-totals]');
  const $cartContent = $('[data-cart-content]');
  const $cartItem = $('[data-cart-item]', $cartContent);
  const options = {
          template: {
            content: 'cart/content',
            totals: 'cart/totals',
          }
        };

  // TODO: Integrate OverlayUtils class
  // const overlayUtils = new OverlayUtils();

  // Remove last item from cart? Reload
  if (remove && $cartItem.length === 1) {
    return window.location.reload();
  }

  utils.api.cart.getContent(options, (err, response) => {
    // TODO: Scope the call to this function by area that needs updating
    $cartContent.html(response.content);
    $cartTotals.html(response.totals);

    $(document.body).trigger('bind-events-cart');

    // TODO: Integrate OverlayUtils class
    // overlayUtils.hide();
  });
}
