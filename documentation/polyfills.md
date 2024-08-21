---
layout: default
title: Polyfills
nav_order: 2
parent: Documentation
---

### polyfills
Its possible to import all polyfills  with a single import statement: `import polyfills`, or only the required polyfills, e.g. `import polyfills/array`, or `import polyfills/array/map`.
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

{: .warning }
Using Polyfills breaks the core library and potentially other features. You can use WsProxy and Pltform functinos as an alternative.
