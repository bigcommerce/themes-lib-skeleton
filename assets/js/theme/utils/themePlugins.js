/*=====================================================
=            Theme specific jQuery plugins            =
=====================================================*/

/**
 *
 * Equalize heights
 *
 */

$.fn.equalizeHeights = function() {
  const maxHeight = this.map((index, el) => {
    return $(el).height();
  }).get();

  return this.height(
    Math.max.apply(this, maxHeight)
  );
};
