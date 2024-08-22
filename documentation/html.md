---
layout: default
title: HTML Loader
nav_order: 6
parent: Documentation
---

### HTML Loader
External HTML files can be imported and displayed. This can be useful if you are building a landing page and want to execute some SSJS code before loading the page, or if you want to display different pages based on the outcome of the SSJS code. There is no native templating language available. To use personalization strings, you need to set AMPscript variables and reference them in the HTML.


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