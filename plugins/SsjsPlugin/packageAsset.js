const htmlAsset = require("./htmlAsset");

function packageAsset(compilation, options) {
    if (!compilation.assets[options.htmlName]) {
        htmlAsset(compilation, options);
    }
    const html = compilation.assets[options.htmlName].source();
    if (!options.isLandingPage) {
        const jsonResourcePackageTemplate = require("../../templates/jsonResourcePackage.json");
        const output = jsonResourcePackageTemplate;
        output.name = options.packageName;
        output.entities.codeResources["1698280"].data.code = html;
        const jsonOutput = JSON.stringify(output)
            .replace(
                /CloudpageCollectionNamePlaceholder/g,
                options.cloudpageCollectionName
            )
            .replace(
                /CodeResourceNamePlaceholder/g,
                options.codeResourceName
            );
        compilation.assets[`${options.packageName}.json`] = {
            source: () => jsonOutput,
            size: () => Buffer.byteLength(jsonOutput, "utf8"),
        };
    }
    else {
        const landingPagePackageTemplate = require("../../templates/landingPagePackage.json");
        const output = landingPagePackageTemplate;
        output.name = options.packageName;
        output.entities.landingPages["1698639-3442"].data.asset.views.html.content = html;
        const jsonOutput = JSON.stringify(output)
            .replace(
                /CloudpageCollectionNamePlaceholder/g,
                options.cloudpageCollectionName
            )
            .replace(
                /LandingpageNamePlaceholder/g,
                options.htmlName
            );
        compilation.assets[`${options.packageName}.json`] = {
            source: () => jsonOutput,
            size: () => Buffer.byteLength(jsonOutput, "utf8"),
        };
    }
    if (!options.html) {
        delete compilation.assets[options.htmlName];
    }
}

module.exports = packageAsset;