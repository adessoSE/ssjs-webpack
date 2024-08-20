---
layout: default
title: Configuration
nav_order: 8
parent: Documentation
---

## Configuration
You can configure the project in `/ssjs.config.js`. 
### package
Setting `package: true` will create a Package for the SFMC package manager. The package contains a Cloudpage Collection and a single JSON Code Resource or landingpage (if html loader was used). This option is useful for deployments, after the code has been tested.\
**default: false** 
### html
Setting `html: true` will wrap the transpiled js in a sfmc compatible html.
**default: true** 
### removeRawJS
Setting `removeRawJS: true` will remove the raw js file. 
**default: false** 
### htmlName
This option sets the output name of the html file (if html is set to true).
**default: index.html** 
### packageName
This option sets the output name of the package file file (if package is set to true).
**default: ssjs-package** 
### cloudpageCollectionName
This option sets the output name of the cloudpage collection file file (if package is set to true).
**default: ssjs-cloudpage-collection** 
### codeResourceName
This option sets the output name of the code resource file file (if package is set to true).
**default: ssjs-code-resource** 
### replacements
This option defines replacement patterns for the output file. This can be useful if standard webpack loaders add code that is not compatible with SSJS.
**default:** 
```js
[
    {
      pattern: /JSON.strinigfy/gi,
      replacement: "Stringify",
    },
    {
      pattern: /JSON.parse/gi,
      replacement: "Platform.Function.ParseJSON",
    },
  ]
  ```