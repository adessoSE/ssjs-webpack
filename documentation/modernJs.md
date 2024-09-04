---
layout: default
title: Modern JS Syntax
nav_order: 3
parent: Documentation
---

### Modern JS Syntax
The framework uses babel loader to transpile your source files to ES3 compatible scripts. 

#### Example
```js
//input
const val = 1;
//output
var val = 1;

//input
[1, 2, 3].map(n => n + 1);
//output
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

{: .note }
this will only transform syntax features, but not add additional functionality to your code. The second example transforms the arrow function but is not aware, that `array.prototype.map` is not a function in SSJS. To use the map function you have to include the [polyfill]({{ site.baseurl }}{% link documentation/polyfills.md %}).