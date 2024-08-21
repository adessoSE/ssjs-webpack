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
### polyfills
Its possible to import all polyfills  with a single import statement: `import polyfills`, or only the required polyfills, e.g. `import polyfills/array`, or `import polyfills/array/map`.
### modern js syntax
The source files will be transpiled to ECMA-3 compatible js, so you can use modern js syntax like arrow functions, const, let or template literals.
### environment variables
Example:
create a new file `/.env`:
```
FOO=BAR
```
in `/src/index.js`:
```
Write(Stringify(process.env.FOO));
```
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
### TypeScriptLoader
import TypeScript into your js files, or use TypeScript exclusively.
Example:
create a new file `/src/add.ts`:
```
export function add(a: number, b: number) : number {
    return a + b;
}
```
in `/src/index.js`:
```
import { add } from "./add.ts";
const result = add(1, 2); // -> 3

```
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
      pattern: /JSON.stringify/gi,
      replacement: "Stringify",
    },
    {
      pattern: /JSON.parse/gi,
      replacement: "Platform.Function.ParseJSON",
    },
  ]
  ```