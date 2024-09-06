---
layout: default
title: Polyfills
nav_order: 2
parent: Documentation
---

### polyfills
Its possible to import all polyfills  with a single import statement: `import polyfills`, or only the required polyfills, e.g. `import polyfills/array`, or `import polyfills/array/map`.\
This refers to the polyfills that are included in the framework. You can of course create your own polyfills, or use alternative implementations. 

{: .warning }
Using Polyfills breaks the core library and potentially other features. You can use WsProxy and Platform functinos as an alternative.

**available polyfills:**
Check the source code at [/framework/polyfills](https://github.com/adessoSE/ssjs-webpack/tree/main/framework/polyfills) for availabel polyfills.