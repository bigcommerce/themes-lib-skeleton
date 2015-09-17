System.config({
  baseURL: "/assets/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "bitbucket:*": "jspm_packages/bitbucket/*"
  },

  map: {
    "asyncly/EventEmitter2": "github:asyncly/EventEmitter2@0.4.14",
    "babel": "npm:babel@4.7.16",
    "babel-runtime": "npm:babel-runtime@4.7.16",
    "bc-baseline": "bitbucket:pixelunion/bc-baseline@0.2.0",
    "bc-carousel": "bitbucket:pixelunion/bc-carousel@2.1.0",
    "bc-loading": "bitbucket:pixelunion/bc-loading@1.0.0",
    "bc-tabs": "bitbucket:pixelunion/bc-tabs@0.1.0",
    "bigcommerce/stencil-utils": "github:bigcommerce/stencil-utils@0.3.2",
    "caolan/async": "github:caolan/async@0.9.2",
    "core-js": "npm:core-js@0.8.4",
    "imagesloaded": "npm:imagesloaded@3.1.8",
    "jquery": "github:components/jquery@2.1.4",
    "jquery-trend": "npm:jquery-trend@0.1.0",
    "knockout": "github:knockout/knockout@3.3.0",
    "lodash": "npm:lodash@3.9.3",
    "normalize.scss": "npm:normalize.scss@0.1.0",
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
    "github:bigcommerce/stencil-utils@0.3.2": {
      "asyncly/EventEmitter2": "github:asyncly/EventEmitter2@0.4.14",
      "jquery": "github:components/jquery@2.1.4",
      "lodash": "npm:lodash@3.9.3"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@4.7.16": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.8.4": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:imagesloaded@3.1.8": {
      "eventie": "npm:eventie@1.0.6",
      "wolfy87-eventemitter": "npm:wolfy87-eventemitter@4.2.11"
    },
    "npm:lodash@3.9.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:wolfy87-eventemitter@4.2.11": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    }
  }
});
