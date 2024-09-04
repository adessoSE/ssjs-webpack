---
title: Home
layout: home
nav_order: 1
---
# The SSJS Framework
The SSJS Framework creates sfmc compatible SSJS from modern Javascript. \
It helps to manage your dependencies seamlessly by organizing them into distinct modules and
enables code sharing across projects with reusable components.\
Create your own modules and also check out the list of available [packages]({% link packages.md %}).
## Features
* importing dependencies from node_modules (if ssjs compatible) and local files. 
* [polyfills]({% link documentation/polyfills.md %})
* modern JS syntax
* environment variables
* ampScriptLoader
* htmlLoader
* TypesScriptLoader
## Example:
create a new file `/src/lib/foo.js`:

```js
export default({
    foo: () => {
        return 'bar';
    }
});
```
in `/src/index.js`:

```js
import foo from './src/lib/foo.js'

Write(foo());
```