
// replaces certain function calls that are inject by certain loaders

const defaultReplacements = [
    {
        pattern: /JSON.stringify/gi,
        replacement: "Stringify",
    },
    {
        pattern: /JSON.parse/gi,
        replacement: "Platform.Function.ParseJSON",
    }
]

function replacements(compilation, options) {
    const filename = options.output;
    const asset = compilation.assets[filename];
    const replacements = defaultReplacements.concat(
        options.replacements || []
    );
    const content = asset.source();
    let newContent = replacements.reduce((acc, curr) => {
        return acc.replace(curr.pattern, curr.replacement);
    }, content);
    compilation.assets[filename] = {
        source: () => newContent,
        size: () => Buffer.byteLength(newContent, "utf8")
    }


}



module.exports = replacements;