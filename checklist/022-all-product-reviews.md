# Browsing product reviews

Added: 2016-04-04

While we have the ability to limit product reviews via frontmatter, Merchants expect the ability to paginate or 'view all' reviews added to a product.

## Option A

Pull all reviews into the page (no frontmatter limit) and limit with a theme editor setting and a javascript toggle

### Template

```handlebars
<!-- pages/product.html -->

---
product:
  reviews:
      limit: 999
---

<!-- ... -->

<div class="product-reviews-container">
  {{#each product.reviews.list}}
    {{#if @index "<" ../theme_settings.productpage_reviews_count}}
      {{> components/products/review-item class="default" show_rating=../settings.show_product_rating}}
    {{/if}}
    {{#if @index ">=" ../theme_settings.productpage_reviews_count}}
      {{> components/products/review-item class="supplementary" show_rating=../settings.show_product_rating}}
    {{/if}}
  {{/each}}
  {{#if product.reviews.list.length ">" theme_settings.productpage_reviews_count}}
    <button data-toggle-extra-reviews>View all reviews</button>
  {{/if}}
</div>

```

```handlebars
<!-- pages/product.html -->

<article class="review-item review-item-{{class}}">
  <header>
    {{> components/products/ratings rating=rating size="medium"}}
    <h5>{{title}}</h5>
    <div>
      {{lang 'product.reviews.written_by_on' name=name date=date}}
    </div>
  </header>
  <p>{{text}}</p>
</article>
```

### Javascript

```javascript
{
  _bindEvents() {
    $(document.body).on('click', '[data-toggle-extra-reviews]', (event) => {
      $('.product-reviews-container').toggleClass('all-reviews-visible');
    });
  }
}
```

### CSS

```scss
.review-item {
  &.review-item-supplementary {
    display: none;

    .all-reviews-visible & { display: block; }
  }
}
```

## Option B

Limit the reviews with frontmatter, and paginate reviews with a pagination partial.

And/or make the pagination ajax with `api.getPage()`!

### Template

```handlebars
<!-- product.html -->

---
product:
  reviews:
      limit: 8
---

<ul>
  {{#each reviews.list}}
    <li>
      <article>
        <header>
          {{> components/products/ratings rating=rating}}
          <h5>{{title}}</h5>
        </header>
        <p>{{text}}</p>
      </article>
    </li>
  {{/each}}
</ul>
{{> components/common/paginator pagination.reviews}}
```
