# Larger product swatch images

Added: 2016-02-22

Whereas before the 'swatch' product option type only returned a tiny image, we can now use the `{{getImage}}` helper to pull a higher-res (max 150x150) version of each image.

## Template

```handlebars
<!-- before -->
<span class="swatch-color" style="background-image: url('{{pattern}}');"></span>

<!-- after -->
<span class="swatch-color" style="background-image: url('{{getImage image 'core-swatch'}}');"></span>
```

**This is in bc-core**, meaning no changes to a theme's markup. Just ensure that you have a `core-swatch` image size defined in `settings._images`.
