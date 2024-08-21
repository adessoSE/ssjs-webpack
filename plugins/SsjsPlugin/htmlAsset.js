function htmlAsset(compilation, options) {
    const filename = options.output;
    const asset = compilation.assets[filename];
    const newContent = `<script runat="server">Platform.Load("core", "1.1.1");${asset.source()}</script>`;
    compilation.assets[options.htmlName] = {
        source: () => newContent,
        size: () => Buffer.byteLength(newContent, "utf8"),
    };

}

module.exports = htmlAsset;