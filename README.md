
# Bigcommerce Skeleton Theme

A stripped-down version of Bigcommerce's official [Stencil](https://github.com/bigcommerce/stencil) theme. Very much a WIP (stands for 'work in progress').


## Dependencies

### [stencil-cli](https://github.com/bigcommerce/stencil-cli)

Development platform for stencil themes. Install this globally with NPM.

### [stencil-utils](https://github.com/bigcommerce/stencil-utils)

Provides theme hooks and api calls for stencil themes. Added to themes with JSPM. Comes bundled with this skeleton.

### [bc-core](https://bitbucket.org/pixelunion/bc-core)

Shared templates for our stencil themes. Not bundled with this skeleton. Run the install script included in bc-core to add it to your theme.


## Webpack

Webpack is now being used as our module bundler. It can be installed globally:

```
$ npm install -g webpack
```

### Installation

```
npm install
```

Once the dependencies are installed, all you have to do is

```
stencil init

stencil start
```


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


