---
layout: default
title: Importing Dependencies
nav_order: 1
parent: Documentation
---

### importing dependencies
You can import local js and ampscript (with ampScript loader) files as dependencies into you index.js. Node modules are also possible, although they have to be compatible with ssjs. It is recommended to single default exports, e.g. `export default(...)` and named imports, e.g. `import foo from 'bar'`.
#### Example:
create a new file `/src/lib/foo.js`:
```
export default({
    foo: () => {
        return 'bar';
    }
});
```
in `/src/index.js`:
```
import foo from './src/lib/foo.js'

Write(foo());
```