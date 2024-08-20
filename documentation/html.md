---
layout: default
title: HTML Loader
nav_order: 6
parent: Documentation
---

### HTML Loader
external html files can be imported and displayed.
> **_NOTE:_** do not overwrite the `/templates/index.ejs`. It is required to build the SFMC compatible script.
Example:
create a new file `/templates/index.html`:
```
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1 name="msg">Hello World!</h1>
    </body>
</html>
```
in `/src/index.js`:
```
import index from 'templates/index.html';
index.display();

```