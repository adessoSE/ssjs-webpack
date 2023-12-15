# SSJS-Webpack
Webpack configuration that creates a sfmc compatible script. 
### Features
* importing dependencies for node_modules (if ssjs compatible) and local files. 
* polyfills
    * array functions (map, reduce, forEach)
    * Object functions (keys)
* modern JS syntax
* ampScriptLoader
* htmlLoader
* minification (optionally)
## Installation
`git clone https://github.com/adessoSE/ssjs-webpack.git`
`cd ssjs-webpack`
`npm install`
## Quickstart
* run `npm run build` in the root folder of the project
* Log into Marketing Cloud
* Create a new Landingpage
* Copy the content of dist/index.html to the landing page
* publish the Landing page
## Documentation
### importing dependencies
You can import local js and ampscript (wit ampScript loader) files as dependencies into you index.js. Node modules are also possible, although they have to be compatible with ssjs. It is recommended to single default exports, e.g. `export default(...)` and named imports, e.g. `import foo from 'bar'`.
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
### polyfills
Its possible to import all polyfills  with a single import statement: `import polyfills`, or only the required polyfills, e.g. `import polyfills/array`, or `import polyfills/array/map`.
### modern js syntax
The source files will be transpiled to ECMA-3 compatible js, so you can use modern js syntax like arrow functions, const, let or template literals.
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
### htmlLoader
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
### minification
By default minification is disabled. To enable it, go to `\webpack.config.js` and set 
```
{
    ...
    optimization: {
        minimize: true,
        ...
    },
    ...
}
```


