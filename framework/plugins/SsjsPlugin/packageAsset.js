
function packageAsset(js, options) {
    const html = `<script runat="server">Platform.Load("core", "1.1.1");${js}</script>`;
    if (!options.isLandingPage) {
        const jsonResourcePackageTemplate = require("../../templates/jsonResourcePackage.json");
        const output = jsonResourcePackageTemplate;
        output.name = `${options.packageName}.json`;
        output.entities.codeResources["1698280"].data.code = html;
        return JSON.stringify(output)
            .replace(
                /CloudpageCollectionNamePlaceholder/g,
                options.cloudpageCollectionName
            )
            .replace(
                /CodeResourceNamePlaceholder/g,
                options.codeResourceName
            );
    }
    else {
        const landingPagePackageTemplate = require("../../templates/landingPagePackage.json");
        const output = landingPagePackageTemplate;
        output.name = `${options.packageName}.json`;
        output.entities.landingPages["1698639-3442"].data.asset.views.html.content = html;
        return JSON.stringify(output)
            .replace(
                /CloudpageCollectionNamePlaceholder/g,
                options.cloudpageCollectionName
            )
            .replace(
                /LandingpageNamePlaceholder/g,
                options.htmlName
            );
    }
}

module.exports = packageAsset;