System.config({
  "baseURL": "/assets/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "bitbucket:*": "jspm_packages/bitbucket/*.js",
    "*": "*.js"
  },
  "defaultJSExtensions": true
});

System.config({
  "map": {
    "asyncly/EventEmitter2": "github:asyncly/EventEmitter2@0.4.14",
    "babel": "npm:babel@4.7.16",
    "babel-runtime": "npm:babel-runtime@4.7.16",
    "bc-baseline": "bitbucket:pixelunion/bc-baseline@0.2.1",
    "bc-carousel": "bitbucket:pixelunion/bc-carousel@2.1.0",
    "bc-loading": "bitbucket:pixelunion/bc-loading@1.0.0",
    "bc-tabs": "bitbucket:pixelunion/bc-tabs@0.1.0",
    "bigcommerce/stencil-utils": "github:bigcommerce/stencil-utils@0.3.4",
    "caolan/async": "github:caolan/async@0.9.2",
    "core-js": "npm:core-js@0.8.4",
    "history": "github:browserstate/history.js@1.8.0",
    "imagesloaded": "npm:imagesloaded@3.1.8",
    "jquery": "github:components/jquery@2.1.4",
    "jquery-trend": "npm:jquery-trend@0.1.0",
    "knockout": "github:knockout/knockout@3.3.0",
    "lodash": "npm:lodash@3.10.1",
    "normalize.scss": "npm:normalize.scss@0.1.0",
    "url": "github:jspm/nodelibs-url@0.1.0",
    "bitbucket:pixelunion/bc-carousel@2.1.0": {
      "imagesloaded": "npm:imagesloaded@3.1.8",
      "jquery": "github:components/jquery@2.1.4",
      "jquery-revealer": "github:pixelunion/jquery.revealer@2.0.0",
      "jquery-trend": "npm:jquery-trend@0.1.0"
    },
    "bitbucket:pixelunion/bc-loading@1.0.0": {
      "jquery": "github:components/jquery@2.1.4",
      "jquery-trend": "npm:jquery-trend@0.1.0"
    },
    "bitbucket:pixelunion/bc-tabs@0.1.0": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:bigcommerce/stencil-utils@0.3.4": {
      "asyncly/EventEmitter2": "github:asyncly/EventEmitter2@0.4.14",
      "jquery": "github:components/jquery@2.1.4",
      "lodash": "npm:lodash@3.10.1"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@4.7.16": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.8.4": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:imagesloaded@3.1.8": {
      "eventie": "npm:eventie@1.0.6",
      "wolfy87-eventemitter": "npm:wolfy87-eventemitter@4.3.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:wolfy87-eventemitter@4.3.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    }
  }
});

