# Sitemap template, and link

Added: 2016-02-18

Affects: `pages/sitemap.html`, `components/footer.html`

Bigcommerce has a sitemap template that allows us to list all pages on the
shop. Merchants frequently request that this page is accessible from somewhere
in the theme's navigation.

## Templates

```handlebars
/pages/sitemap.html

...

<section class="sitemap">
  {{#each sitemap}}
    <div class="sitemap-group">
      <h2 class="sitemap-title">{{title}}</h2>
      {{> components/sitemap-group items=body}}
    </div>
  {{/each}}
</section>

...

/components/sitemap-group.html

{{!
  @param items
         A sitemap tree. Each item can have a `url`, `label`, and `children`.
}}
{{#if items.length}}
  <ul>
    {{#each items}}
      <li>
        <a href="{{url}}">{{label}}</a>
        {{#if children}}
          {{> components/sitemap-group items=children}}
        {{/if}}
      </li>
    {{/each}}
  </ul>
{{/if}}
```

## Link

Since the only way to access the sitemap is with a hard-coded URL, we recommend
having a theme setting to display a link in the footer.

```json
{
  "type": "checkbox",
  "label": "Show sitemap link in footer navigation",
  "id": "show_sitemap"
}
```

```handlebars
{{#if theme_settings.show_sitemap}}
  <a href="{{urls.sitemap}}">{{lang 'sitemap.title'}}</a>
{{/if}}
```
