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
	* every
	* filter
	* find
	* forEach
	* includes
	* indexOf
	* isArray
	* lastIndexOf
	* map
	* reduce
	* reduceRight
	* some
* object
	* create
	* defineProperty
	* defineProperties
	* keys
	* values
* string
	* endsWith
	* startsWith
	* trim

{: .warning }
Using Polyfills breaks the core library and potentially other features. You can use WsProxy and Pltform functinos as an alternative.
