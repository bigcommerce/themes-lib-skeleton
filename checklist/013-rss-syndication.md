# RSS Syndication Template

Added: 2016-03-07

Affects: `pages/page.html`

Control Panel: `Content > Web Pages > Edit > Display syndicated content from an RSS feed`

Merchants have the option to include a list of links to all configured RSS feeds on their site. Checking the setting above inserts the string `%%Syndicate%%` into the page content, which we then must replace with the correct template.

## Template

```handlebars
<!-- pages/page.html-->
<div class="page-content">
  {{#replace '%%Syndicate%%' page.content}}
    {{> components/page/rss-feed}}
  {{else}}
    {{{page.content}}}
  {{/replace}}
</div>
```

```handlebars
<!-- components/page/rss-feed.html-->
<p>{{lang 'rss.intro'}}</p>

{{#if urls.rss.blog}}
  <h2>{{lang 'rss.blog.heading'}}</h2>
  <p>
    {{lang 'rss.blog.intro' limit=settings.rss_item_limit store=settings.store_name}}
  </p>
  <ul>
    <li>
      <a href="{{urls.rss.blog}}">{{lang 'rss.blog.rss' limit=settings.rss_item_limit}}</a>
    </li>
    <li>
      <a href="{{urls.rss.blog_atom}}">{{lang 'rss.blog.rss_atom' limit=settings.rss_item_limit}}</a>
    </li>
  </ul>
{{/if}}

{{#if urls.rss.products.new}}
  <h2>{{lang 'rss.products.new.heading'}}</h2>
  <p>
    {{lang 'rss.products.new.intro' limit=settings.rss_item_limit store=settings.store_name}}
  </p>
  <ul>
    <li>
      <a href="{{urls.rss.products.new}}">{{lang 'rss.products.new.rss' limit=settings.rss_item_limit}}</a>
    </li>
    <li>
      <a href="{{urls.rss.products.new_atom}}">{{lang 'rss.products.new.rss_atom' limit=settings.rss_item_limit}}</a>
    </li>
  </ul>
{{/if}}

{{#if urls.rss.products.popular}}
  <h2>{{lang 'rss.products.popular.heading'}}</h2>
  <p>
    {{lang 'rss.products.popular.intro' limit=settings.rss_item_limit store=settings.store_name}}
  </p>
  <ul>
    <li>
      <a href="{{urls.rss.products.popular}}">{{lang 'rss.products.popular.rss' limit=settings.rss_item_limit}}</a>
    </li>
    <li>
      <a href="{{urls.rss.products.popular_atom}}">{{lang 'rss.products.popular.rss_atom' limit=settings.rss_item_limit}}</a>
    </li>
  </ul>
{{/if}}

{{#if urls.rss.products.featured}}
  <h2>{{lang 'rss.products.featured.heading'}}</h2>
  <p>
    {{lang 'rss.products.featured.intro' limit=settings.rss_item_limit store=settings.store_name}}
  </p>
  <ul>
    <li>
      <a href="{{urls.rss.products.featured}}">{{lang 'rss.products.featured.rss' limit=settings.rss_item_limit}}</a>
    </li>
    <li>
      <a href="{{urls.rss.products.featured_atom}}">{{lang 'rss.products.featured.rss_atom' limit=settings.rss_item_limit}}</a>
    </li>
  </ul>
{{/if}}

```

## Language

```json
{
  "rss": {
    "intro": "RSS feeds are used for syndicating regularly changing content on a web site, including this one. You can open an RSS feed using an RSS reader and use it to see if there is any new content on this site or you can set up a server-side script to parse the feed and display it on your web site.",
    "heading": "RSS Syndication",
    "blog": {
      "heading": "Recent Blog Posts",
      "intro": "The recent post feed contains the latest {limit} blog posts published on {store}.",
      "rss": "Latest {limit} Blog Posts (RSS)",
      "rss_atom": "Latest {limit} Blog Posts (Atom)"
    },
    "products": {
      "new": {
        "heading": "New Products",
        "intro": "The latest products feed contains the latest {limit} products added to {store}.",
        "rss": "Latest {limit} New Products (RSS)",
        "rss_atom": "Latest {limit} New Products (Atom)"
      },
      "popular": {
        "heading": "Popular Products",
        "intro": "The popular products feed contains the top {limit} most popular products on {store} as rated by users.",
        "rss": "Latest {limit} Popular Products (RSS)",
        "rss_atom": "Latest {limit} Popular Products (Atom)"
      },
      "featured": {
        "heading": "Featured Products",
        "intro": "The featured products feed contains the latest {limit} featured products on {store}.",
        "rss": "Latest {limit} Featured Products (RSS)",
        "rss_atom": "Latest {limit} Featured Products (Atom)"
      }
    },
    "search": {
      "heading": "Product Searches",
      "intro1": "Product search feeds allow you to save your custom product searches as syndication feed that will always update when there are new results.",
      "intro2": "To create a product search feed, perform a standard search on {store} and at the bottom of the page click on one of the syndication options."
    }
  }
}
```
