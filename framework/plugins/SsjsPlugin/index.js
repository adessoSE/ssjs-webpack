const htmlAsset = require('./htmlAsset');
const packageAsset = require('./packageAsset');
const dynamicPolyfills = require('./dynamicPolyfills');
const { sources } = require('webpack');
const minify = require('./minify');
const fs = require('fs');


class SsjsPlugin {
  static defaultOptions = {
    output: "main.js",
    package: false,
    html: true,
    removeRawJS: true,
    htmlName: "index.html",
    packageName: "ssjs-package",
    cloudpageCollectionName: "ssjs-cloudpage-collection",
    codeResourceName: "ssjs-code-resource",
    dynamicPolyfills: false,
    minify: false
  };
  constructor(options = {}) {
    this.options = {
      ...SsjsPlugin.defaultOptions,
      ...options
    };
  }
  apply(compiler) {

    const pluginName = SsjsPlugin.name;
    this.options.isLandingPage = false;
    compiler.hooks.compilation.tap(pluginName, (compilation) => {

      compilation.hooks.buildModule.tap(pluginName, (module) => {
        if (module.resource) {
          this.options.isLandingPage |= /\.html$/.test(module.resource);
        }
      });
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        (assets) => {
          for (const asset in assets) {
            let js = compilation.assets[asset].source();
            if (this.options.dynamicPolyfills) {
              console.warn("\nWARNING:\nDynamic Polyfills is an experimental feature. Check the documentation for further information.\n\n")
              js = dynamicPolyfills(js);
            }
            if (this.options.minify && this.options.minify != 'false') {
              js = minify(js);
            }
            compilation.updateAsset(
              asset,
              new sources.RawSource(js)
            );
            if (this.options.html && this.options.html != 'false') {
              compilation.emitAsset(
                this.options.htmlName,
                new sources.RawSource(htmlAsset(js))
              )
            }
            if (this.options.package) {
              compilation.emitAsset(
                `${this.options.packageName}.json`,
                new sources.RawSource(packageAsset(js, this.options))
              )
            }
            if (this.options.removeRawJS && this.options.removeRawJS != 'false') {
              compilation.deleteAsset(asset);
            }
          }

        }
      );

      compilation.hooks.finishModules.tap(pluginName, (modules) => {

        const mods = {};
        for (const module of modules) {
          const mod = module.rawRequest;
          if (!mods[mod]) {
            mods[mod] = new Set();
          }
          const deps = compilation.moduleGraph.getOutgoingConnections(module);
          deps.forEach(dep => {
            if (dep.module) {
              mods[mod].add(dep.module.rawRequest);
            }
          });
        }

        const nodes = Object.keys(mods).map(mod => `${mod}[${mod}]`).join("\n");
        const links = Object.keys(mods).map(mod => Array.from(mods[mod]).map(dep => `${mod} --- ${dep}`).join("\n")).join("\n");
        const graph = 'flowchart TB\n' + nodes + '\n' + links;
        fs.writeFile('dependencies.md', "```mermaid\n" + graph + "```", function (err) {
          console.log(err)
        })
        console.log(graph)
      });
    });

  }
}

module.exports = SsjsPlugin;
