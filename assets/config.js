System.config({
  "baseURL": "/assets/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "asyncly/EventEmitter2": "github:asyncly/EventEmitter2@0.4.14",
    "babel": "npm:babel@4.7.16",
    "babel-runtime": "npm:babel-runtime@4.7.16",
    "bigcommerce/stencil-utils": "github:bigcommerce/stencil-utils@0.0.9",
    "caolan/async": "github:caolan/async@0.9.2",
    "core-js": "npm:core-js@0.8.4",
    "imagesloaded": "npm:imagesloaded@3.1.8",
    "jquery": "github:components/jquery@2.1.4",
    "jquery-trend": "npm:jquery-trend@0.1.0",
    "knockout": "github:knockout/knockout@3.3.0",
    "lodash": "npm:lodash@3.9.2",
    "normalize.css": "npm:normalize.css@3.0.3",
    "github:bigcommerce/stencil-utils@0.0.9": {
      "asyncly/EventEmitter2": "github:asyncly/EventEmitter2@0.4.14",
      "jquery": "github:components/jquery@2.1.4",
      "lodash": "npm:lodash@3.9.2"
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
    "npm:lodash@3.9.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:wolfy87-eventemitter@4.2.11": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    }
  }
});

