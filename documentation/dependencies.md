---
layout: default
title: Importing Dependencies
nav_order: 1
parent: Documentation
---

### Importing Dependencies
Use ES6 module syntax to handle dependencies. Check the [webpack documentation](https://webpack.js.org/api/module-methods/) for more details.

**import** \
Statically import the exports of another module.
```js
import MyModule from './my-module.js';
import { NamedExport } from './other-module.js';
import './my-polyfills.js';
```

**export**\
Export anything as a default or named export.
```js
// Named exports
export var Count = 5;
export function Multiply(a, b) {
  return a * b;
}

// Default export
export default {
  // Some data...
};
```

