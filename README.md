
# Bigcommerce Skeleton Theme

A stripped-down version of Bigcommerce's official [Stencil](https://github.com/bigcommerce/stencil) theme. Very much a WIP (stands for 'work in progress').

Dependent on Bigcommerce's [stencil-utils](https://github.com/bigcommerce/stencil-utils) as well as [stencil-cli](https://github.com/bigcommerce/stencil-cli) for development. Check out respective readmes for usage notes!


## JSPM

Asset packages are handled using [JSPM](http://jspm.io/).

The plan is to develop a set of reusable 'modules' (carousel, slider, lightbox etc) which theme developers can easily drop into their project using JSPM. Modules will contain core JS and SCSS. So far we have a [carousel](https://bitbucket.org/pixelunion/bc-carousel) thanks to Connor.

### Installation

```
$ npm install -g jspm
```

Because our modules are private and hosted on bitbucket, it's important to also install [jspm-git](https://www.npmjs.com/package/jspm-git) which will allow for packages to be pulled from registries other than npm and github:

```
$ npm install -g jspm-git
$ jspm registry create bitbucket jspm-git
```

Then run `jspm install` from the theme directory.

## Theme Directory Structure

### SCSS
```
scss
  |-- modules/
  |-- general/
  |-- pages/
  +-- theme.scss

```

##### general/
All your global styles.

##### pages/
Page-specific: `_home.scss`, `_blog-post.scss` etc.

##### modules/
For overrides to any modules you may need. If you've got a `carousel` module and you want different arrow colours or the like, drop a `_carousel.scss` in here. Never be editing anything within a jspm package.

### JS
```
js
  |-- theme/
  |-- app.js
  +-- page-manager.js

```
...

### Templates
```
templates
  |-- components/
  |-- layout/
  +-- pages/

```

### Notes

#### Quick Shop
When developing a quick shop, all the base functions you'll need reside within `product-utils.js`—use these.


