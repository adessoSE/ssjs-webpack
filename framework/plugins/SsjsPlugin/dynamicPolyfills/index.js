
const traverse = require('@babel/traverse').default;
const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;
const { assignmentIsPolyfill, callExpressionIsPolyfill, assignmentIsFunctionsDeclaration, callerClass, callerInstance, callExpressionIsPolyfillDeclaration } = require('./types');
const { loadPolyfillReplacement, transformPolyfillCall } = require('./transformer');


function dynamicPolyfills(js) {
    const ast = parse(js);
    const importedPolyfills = [];
    ast.program.body.unshift(callerInstance());
    ast.program.body.unshift(callerClass());
    let functionsObject;
    traverse(ast, {
        AssignmentExpression(path) {
            if (assignmentIsFunctionsDeclaration(path.node)) {
                functionsObject = path.node.right;
            }
            if (assignmentIsPolyfill(path.node)) {
                path.remove();
            }
        },
        CallExpression(path) {
            if(callExpressionIsPolyfillDeclaration(path.node)) {
                path.remove();
            }
            else if (callExpressionIsPolyfill(path.node)) {
                const functionName = path.node.callee.property.name;
                const replacements = loadPolyfillReplacement(functionName);
                if (!importedPolyfills.includes(functionName)) {
                    functionsObject.properties.push(replacements);
                    importedPolyfills.push(functionName);
                }
                path.replaceWith(
                    transformPolyfillCall(path.node)
                );
            }
        }
    })
    return generate(ast).code;
}

module.exports = dynamicPolyfills;