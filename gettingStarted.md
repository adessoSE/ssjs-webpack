---
title: Getting Started
layout: default
nav_order: 3
---

## Getting Started
After Installation you can create a new ssjs project:
```
yo ssjs
cd <ssjs-project>
npm install
npm run build
```
This will create a simple "hello world!" file from the `/src/index.js` file. You can start developing directly in the index.js file. \
If you want to improve modularity you can start to structure your project into modules ([Importing Dependencies]({% link documentation/dependencies.md %})) or check out the existing [Packages](% link packages.md %).

### Simple Deployment
* run `npm run build`in your terminal
* Log into Marketing Cloud
* Create a new Landingpage or JSON Resource
* Copy the content of `dist/index.html` to the landing page
* publish the Landing page

### Deployment with Content Block
If you need faster feedback during development, you can follow the same steps. However, instead of pasting the code directly into the landing page, create an additional content block and reference it on the landing page using `%%=ContentBlockById(<your content block id>)=%%`. 

### VSCode Setup
The SSJS Framework works with [SSJS Manager](https://www.fibworks.com/ssjs-vsc), which is available on the VSCode [Marketplace](https://marketplace.visualstudio.com/items?itemName=FiB.ssjs-vsc). The Plugin has intruduced [hooks](https://www.fibworks.com/blog/hooks-v061/) to support automated workflows, allowing you to automatically upload your output file to Marketing Cloud without having to manually build and upload each time.
* Install the latest version of the SSJS Framework:`npm install --global generator-ssjs` (minimum version required 3.1.0)
* Install SSJS Manager (search for ssjs manager in VSCode extensions)
* create a new ssjs project 
* configure your project
    * the configuration page should open up automatically
    * alternatively you can press F1 and run the VSCode command `SSJS: Show Config`
    * follow the setup steps. 
* In your project open the setup file (`/.vscode/ssjs-setup.json`)
    * find the "hooks" section
    * change `hooks["on-save"][".js"]["enabled"]` to `true`
    * change `hooks["on-save"][".js"]["output-file"]` to `./dist/{{name}}.html`
* Press F1 and run `SSJS: Upload Script to Dev`
* You should get a notification that the upload was successful
* you can now preview your code by running `SSJS: Run`
* The hook will automatically run `npm run build` when you execute `SSJS: Upload Script to Dev`
