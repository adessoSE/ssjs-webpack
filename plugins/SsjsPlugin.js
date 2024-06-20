const jsonResourcePackageTemplate = require("../templates/jsonResourcePackage.json");

class SsjsPlugin {
  static defaultOptions = {
    package: false,
    html: true,
    removeRawJS: true,
    htmlName: "index.html",
    packageName: "ssjs-package",
    cloudpageCollectionName: "ssjs-cloudpage-collection",
    codeResourceName: "ssjs-code-resource",
    replacements: [
      {
        pattern: /JSON.strinigfy/gi,
        replacement: "Stringify",
      },
      {
        pattern: /JSON.parse/gi,
        replacement: "Platform.Function.ParseJSON",
      },
    ],
  };
  constructor(options = {}) {
    this.options = {
      ...SsjsPlugin.defaultOptions,
      ...options,
      replacements: SsjsPlugin.defaultOptions.replacements.concat(
        options.replacements || []
      ),
    };
  }
  apply(compiler) {
    const pluginName = SsjsPlugin.name;
    const { webpack } = compiler;
    const { Compilation } = webpack;
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_COMPATIBILITY ,
        },
        (assets) => {
          Object.keys(assets).forEach((filename) => {
            const asset = compilation.assets[filename];
            const content = asset.source();
            let newContent = this.options.replacements.reduce((acc, curr) => {
              return acc.replace(curr.pattern, curr.replacement);
            }, content);
            if (this.options.html) {
              newContent = `<script runat="server">Platform.Load("core", "1.1.1");${newContent}</script>`;
              compilation.assets[this.options.htmlName] = {
                source: () => newContent,
                size: () => Buffer.byteLength(newContent, "utf8"),
              };
            }
            if (this.options.removeRawJS) {
              delete compilation.assets[filename];
            }
            if (this.options.package) {
              const output = jsonResourcePackageTemplate;
              output.name = this.options.packageName;
              output.entities.codeResources["1698280"].data.code = content;
              const jsonOutput = JSON.stringify(output)
                .replace(
                  /CloudpageCollectionNamePlaceholder/g,
                  this.options.cloudpageCollectionName
                )
                .replace(
                  /CodeResourceNamePlaceholder/g,
                  this.options.codeResourceName
                );
              compilation.assets[`${this.options.packageName}.json`] = {
                source: () => jsonOutput,
                size: () => Buffer.byteLength(jsonOutput, "utf8"),
              };
            }
          });
        }
      );
    });
  }
}

module.exports = SsjsPlugin;
