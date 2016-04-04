# Enabling/Disabling the blog

Added: 2016-04-04

Control Panel: `Content > Blog > Blog Visibility`

In the `settings` JSON we now have a boolean to test whether the blog has been enabled or not. This is useful for themes that are harcoding a blog link into the nav menu.

## Template

```handlebars
<!-- header.html -->
<ul>
  {{#each menu_items}}
    <!-- nav happens here -->
  {{/each}}

  {{#if settings.blog_enabled}}
    <li>
      <a href="{{blog.url}}">
        {{blog.name}}
      </a>
    </li>
  {{/if}}
</ul>
```
