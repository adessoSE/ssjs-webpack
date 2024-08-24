const htmlAsset = require('./htmlAsset');
const packageAsset = require('./packageAsset');
const dynamicPolyfills = require('./dynamicPolyfills'); 

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
  };
  constructor(options = {}) {
    this.options = {
      ...SsjsPlugin.defaultOptions,
      ...options
    };
  }
  apply(compiler) {
    const pluginName = SsjsPlugin.name;
    const { webpack } = compiler;
    const { Compilation } = webpack;
    this.options.isLandingPage = false;
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.buildModule.tap(pluginName, (module) => {
        if (module.resource) {
          this.options.isLandingPage |= /\.html$/.test(module.resource);
        }
      });

      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_COMPATIBILITY,
        },
        () => {
          if(this.options.dynamicPolyfills) {
            dynamicPolyfills(compilation, this.options);
          }
          if (this.options.html && this.options.html != 'false') {
            htmlAsset(compilation, this.options)
          }
          if (this.options.package) {
            packageAsset(compilation, this.options);
          }
          if (this.options.removeRawJS && this.options.removeRawJS != 'false') {
            delete compilation.assets[this.options.output];
          }
        }
      );
    });

  }
}

module.exports = SsjsPlugin;
