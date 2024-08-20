---
layout: default
title: AmpScript Loader
nav_order: 5
parent: Documentation
---

### ampScriptLoader 
external ampScript files can be imported into the js source file. Both '.amp' and '.ampscript' will be recognized as ampScript import.
Example: 
create a new file `/src/lib/foo.amp`:
```
SET @response = "Content From external ampScript"
```
in `/src/index.js`:
```
import ampFile from './lib/foo.amp'
Write(ampFile.run());
```