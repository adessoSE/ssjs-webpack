---
layout: default
title: Dynamic Polyfills
nav_order: 9
parent: Documentation
---

## Dynamic Polyfills

{: .note }
This is an experimental feature. To use it, install the alpha version by running `npm install --global generator-ssjs@alpha`.

Dynamic Polyfills enable you to use modern JS functions without importing the polyfills. Instead the polyfills will be added from the plugin if the functions are detected. the dynamic polyfills also don't break the core library, as they will transform the functions to prevent updating the prototype. 

**Example:**

input:
```javascript
[1,2,3].map(e => e * 2);
```

output:
```javascript
function arrayMap(callbackFn) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    arr.push(callbackFn(this[i], i, this));
  }
  return arr;
}
;
/******/(function () {
  // webpackBootstrap
  var __webpack_exports__ = {};
  arrayMap.call([1, 2, 3], function (e) {
    return e * 2;
  });
  /******/
})();
```

**available polyfills:**
Check the source code at [/framework/polyfills](https://github.com/adessoSE/ssjs-webpack/tree/main/framework/polyfills) for availabel polyfills.