# Copyright year and shop name in footer

Added: 2016-03-14

Merchants expect a copyright note in the footer of their shops. Depending on the design, this could be toggleable in the Theme Editor.

Stencil's handlebar template library doesn't yet support date parsing, so we need to inject the current year with javascript.

## Template

```handlebars
<!-- footer partial -->
&copy; <script>document.write(new Date().getFullYear())</script> <a href="{{settings.base_url}}">{{settings.store_name}}</a>
```
