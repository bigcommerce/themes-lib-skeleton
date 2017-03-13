# Skeleton supports these items on the checklist

#### - 001 - Product SKU in cart - []
- This may not be necessary in all themes but it's worth considering

#### - 002 - Large Image Support - []
- This is a design consideration but should be addressed on a theme-by-theme basis

#### - 003 - Customer Groups - []
- Haven't seen this implemented, not sure this is necessary

#### - 004 - Shipping City - []
- This should be implemented in Skeleton or BC Core(todo), in the meantime make sure it's in your theme

#### - 005 - Measurement Units - []
- Implemented for weight in `templates/components/product/details`, todo add examples for height etc.. in skeleton

#### - 006 - Non Sale Price - []
- Would be nice to see the pricing logic in core updated or removed, have a standard way to handle pricing. 
 One that utilizes `non_sale_prices`
  
#### - 007 - Wishlist Enabled Setting - [x]

#### - 008 - Giftcard Enabled Setting - []
- todo add this to skeleton

#### - 009 - Sitemap - []
- Sitemap logic is in skeleton, make sure there's a sitemap link in the footer(or elsewhere)

#### - 010 - Larger Swatches [x]

#### - 011 - Bulk Pricing - []

#### - 012 - Payment Icons - []
- Almost there, just need Apple Pay I believe

#### - 013 - RSS Syndication - [x]
 
#### - 014 - Deep Nested Syndication - []
- todo, get a better nav example in skeleton(8 categories and updated nav options)

#### - 015 - Tax Labels - [x]
- hopefully this will be rolled into price changes

#### - 016 - Single Currency Selector - [x]
- Skelly's version works(hide currency selector) but you could also take the example from the checklist and just 
 show the language code
 
#### - 017 - Copyright Year - [x]

#### - 018 - Carousel Height - []

#### - 019 - Facebook Like - [x]

#### - 020 - Conditional Customer Links - []

#### - 021 - Conditional Quantity Box - []

#### - 022 - All Product Reviews - []

#### - 023 - Blog Visibility Setting - []

#### - 024 - Syndicated Feed(external) - [x]

#### - 025 - UPS Shipping - []
todo add this to core as part of the shipping estimator

#### - 026 - Shipping City(duplicate of 004) - []
(better logic example here though)

#### - 027 - Footer - []

#### - 028 - Minicart - []

#### - 029 - Sales Badges - [] 
- might be able to roll into our pricing logic
 
#### - 030 - Homepage - [] 

#### - 031 - Quickview - []

#### - 032 - Collections - []

#### - 033 - 'As low as' pricing logic - []

## TODO
Shipping estimator in core 

Figure out a strategy for pricing, currently our pricing display is different than Cornerstone's.
Would be nice to see sales price used right.

Checkout strategy - 3 options(1 all share a bunch of options, 2: use a themes current color options , 3, checkbox with current color scheme) - need more info

Strategy on the cart page, rte content, blog, feceted search, and contact pages. 
 Maybe we can work something out
to have this stuff in core.  For some stuff we could say have two, three templates to choose 
from and just skin theme.