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

**example:**
input:
```javascript
[1,2,3].map(e => e * 2);
```

output:
```javascript
function arrayMap(array, callbackFn) {
  var arr = [];
  for (var i = 0; i < array.length; i++) {
    arr.push(callbackFn(array[i], i, array));
  }
  return arr;
}
;
/******/(function () {
  // webpackBootstrap
  var __webpack_exports__ = {};
  arrayMap([1, 2, 3], function (e) {
    return e * 2;
  });
  /******/
})();
```

**available polyfills:**
* array
    * filter
    * forEach
    * includes
    * map
    * reduce
* object
    * keys
    * values


