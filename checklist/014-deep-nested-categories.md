# Deep Category Nesting

Added: 2016-03-07

Bigcommerce merchants like to have lots of categories. Our themes, while they may look much better with only two or three levels of nesting, should be able to display as many nested levels of categories as the Bigcommerce control panel permits.

Handlebars permits recursive partials, which makes this possible (along with some well-considered css, of course).

## Template

For example:

```handlebars
<!-- components/navigation.html -->

<ul class="main-menu">
  {{#each categories}}
    <li class="menu-item">
      {{> components/site-navigation}}
    </li>
  {{/each}}
</ul>
```

```handlebars
<!-- components/navigation-item.html -->

<a href="{{url}}">{{name}}</a>

{{#if children}}
  <ul class="submenu">
    {{#each children}}
      <li class="submenu-item">
        {{> components/site-navigation}}
      </li>
    {{/each}}
  </ul>
{{/if}}
```
