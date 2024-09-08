const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const index = require('./functionsIndex');
const { assignmentIsPolyfill } = require('./types');


function transformPolyfill(ast) {
    let polyfill;
    traverse(ast, {
        AssignmentExpression(path) {
            if (assignmentIsPolyfill(path.node)) {
                const name = `dynamic_polyfill_${path.node.left.property.name}`
                polyfill = types.variableDeclaration('var', [types.variableDeclarator(types.identifier(name), path.node.right)])
            }

        }
    });
    return polyfill;
}

function loadPolyfill(p) {
    const data = fs.readFileSync(path.resolve(__dirname, `../../../polyfills/${p}`), { encoding: 'utf8', flag: 'r' });
    return parse(data);

}

function loadPolyfillReplacement(func) {
    return types.objectProperty(
        types.identifier(func),
        types.objectExpression(
            index
                .filter(entry => func === entry.func)
                .map(entry => ({ ...entry, ast: loadPolyfill(entry.p) }))
                .map(entry => ({ ...entry, transformedAst: transformPolyfill(entry.ast) }))
                .map(entry => types.objectProperty(
                    types.identifier(entry.type),
                    entry.transformedAst.declarations[0].init
                ))
        )
    )

}

function transformPolyfillCall(callNode) {

    return types.expressionStatement(
        types.callExpression(
            types.memberExpression(
                types.identifier("_dpfc"), types.identifier("_call")
            ),
            [callNode.callee.object, types.stringLiteral(callNode.callee.property.name), types.arrayExpression(callNode.arguments)]
        )
    )
}

module.exports = {
    loadPolyfillReplacement,
    transformPolyfillCall
};
