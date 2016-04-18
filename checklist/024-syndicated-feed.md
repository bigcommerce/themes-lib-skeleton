# Custom RSS feed

Added: 2016-04-18

Control Panel: `Storefront Content > Web Pages > (page) > Display syndicated content from an RSS feed`

Merchants have the ability to display a feed from an external rss url on their site.

## Template

```handlebars
<!-- pages/page.html -->

<main class="page">

    <!-- rest of page content here... -->

    {{#if page.feed}}
      <ul>
        {{#each page.feed}}
          <li>
            <h6><a href="{{url}}" target="_blank">{{title}}</a></h6>
            <p>{{{content}}}</p>
          </li>
        {{/each}}
      </ul>
    {{/if}}
</main>
```
