---
layout: default
title: Dynamic Polyfills
nav_order: 1
parent: Experimental
---

## Dynamic Polyfills

{: .note }
This is an experimental feature. To use it, set the dynamicPolyfills option to true. (in `/ssjs.config.js`). Check the **[considerations](#considerations)** for more information.

### Table of Contents
* [Description](#description)
* [Simple Example](#simple-example)
* [Polyfill Dependencies](#polyfill-dependencies)
* [Considerations](#considerations)

### Description

Dynamic Polyfills allow you to use modern JavaScript functions without explicitly importing polyfills. Instead, the plugin automatically adds the necessary polyfills when those functions are detected. Additionally, dynamic polyfills won't interfere with the Core library, as they transform functions to avoid modifying the prototype.

### Simple Example

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
### Polyfill Dependencies
If the plugin detects that a polyfill already in use has been imported, it will remove it and replace it with a dynamic implementation. This is particularly helpful when a package relies on polyfills (e.g., [e360-ssjs-lib](https://www.npmjs.com/package/e360-ssjs-lib)), but you still want to leverage Core library functions.

For instance, the following scenario wouldn't work because the e360-ssjs library depends on polyfills, which causes issues with the Core library function `DataExtension.Retrieve()`.

By enabling dynamicPolyfills in `ssjs.config.js`, the existing polyfill definitions are replaced by dynamic ones, allowing the code to run smoothly.

**Example:**

```javascript
import { logger } from 'e360-ssjs-lib';

const log = new logger("DEV");
log.level = "INFO";

log.info(
    DataExtension.
    Retrieve()
    .filter(de => de.IsSendable)
    .map(de => de.Name)
);
```
**available polyfills:**
Check the source code at [/framework/polyfills](https://github.com/adessoSE/ssjs-webpack/tree/main/framework/polyfills) for availabel polyfills.

### Considerations

This is an experimental feature and will likely remain so in the future. It adds extra code to your bundle, attempts to identify the correct function at runtime, and invokes it with the callee as the **this** argument. However, this may increase complexity and make debugging more challenging. Additionally, since SSJS handles context differently from Node.js, there may be edge cases where this causes errors.
