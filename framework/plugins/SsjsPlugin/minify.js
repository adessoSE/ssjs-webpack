const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;

function minify(js) {
    const ast = parse(js);
    return generate(ast, { 
        comments: false,
        compact: true,
        minified: true
    }).code
}

module.exports = minify;