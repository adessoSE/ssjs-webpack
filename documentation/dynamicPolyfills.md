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
function DynamicPolyfillCaller() {
  this.getType = function (callee) {
    if (callee === Array || Object.prototype.toString.call(callee) === '[object Array]') {
      return 'array';
    } else if (callee === Object || Object.prototype.toString.call(callee) === '[object Object]' && typeof callee !== 'function') {
      return 'object';
    } else if (callee === String || typeof callee === 'string') {
      return 'string';
    } else if (callee === Number || typeof callee === 'number') {
      return 'number';
    }
    return false;
  };
  this._functions = {
    map: {
      array: function (callbackFn) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
          arr.push(callbackFn(this[i], i, this));
        }
        return arr;
      }
    }
  };
  this.getFunction = function (callee, funcName) {
    return this._functions[funcName][this.getType(callee)];
  };
  this._call = function (callee, funcName, args) {
    var f = this.getFunction(callee, funcName);
    return f.apply(callee, args);
  };
  return this;
}
var _dpfc = new DynamicPolyfillCaller();
/******/(function () {
  // webpackBootstrap
  _dpfc._call([1, 2, 3], "map", [function (e) {
    return e * 2;
  }]);
  /******/
})();
```

**available polyfills:**
Check the source code at [/framework/polyfills](https://github.com/adessoSE/ssjs-webpack/tree/main/framework/polyfills) for availabel polyfills.