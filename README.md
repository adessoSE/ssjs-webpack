# The SSJS Framework
Framework that creates a sfmc compatible script from modern Javascript. 
### Features
* importing dependencies for node_modules (if ssjs compatible) and local files. 
* polyfills
    * array functions (map, reduce, forEach)
    * Object functions (keys)
* modern JS syntax
* environment variables
* ampScriptLoader
* htmlLoader
* TypesScriptLoader
## Installation
the recommended way to install is by using the [yeoman-generator](https://www.npmjs.com/package/generator-ssjs):
```
npm install --global yo
npm install --global generator-ssjs
```
## Quickstart
After Installation you can create a new ssjs project:
```
yo ssjs
cd <ssjs-project>
npm install
npm run build
```
* Log into Marketing Cloud
* Create a new Landingpage
* Copy the content of dist/index.html to the landing page
* publish the Landing page
## Documentation
Checkout the official documentation at [https://adessose.github.io/ssjs-webpack/](https://adessose.github.io/ssjs-webpack/)