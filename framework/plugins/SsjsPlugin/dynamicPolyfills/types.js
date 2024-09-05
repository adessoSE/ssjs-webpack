const index = require('./functionsIndex');
const types = require('@babel/types');
const { parse } = require('@babel/parser');
const DynamicPolyfillCaller = require('./DynamicPolyfillCaller');


function assignmentIsPolyfill(assignmentNode) {

    if (!assignmentNode.left) {
        return false;
    }

    const left = assignmentNode.left;
    let type;
    let func;
    if (left.object) {
        if (left.object.object && left.object.property && left.object.property.name === 'prototype') {
            type = left.object.object.name;
        }
        else {
            type = left.object.name;
        }
        func = left.property.name;
    }
    return index.some(entry => func === entry.func && type.toLowerCase() === entry.type.toLowerCase());
}

function callExpressionIsPolyfill(callNode) {
    return types.isMemberExpression(callNode.callee) &&
        index.some(entry => callNode.callee.property.name === entry.func)
}

function callExpressionIsPolyfillDeclaration(callNode) {
    const callee = callNode.callee;

    if (
        types.isMemberExpression(callee) &&
        types.isIdentifier(callee.object, { name: "Object" }) &&
        types.isIdentifier(callee.property, { name: "defineProperty" })
    ) {

        const args = callNode.arguments;

        const type = (args[0].property?.name && args[0].object?.name) || args[0].name;
        const func = args[1].value;
        return index.some(entry => func === entry.func && type.toLowerCase() === type.toLowerCase())
    }
    return false;
}

function assignmentIsFunctionsDeclaration(assignmentNode) {
    return types.isMemberExpression(assignmentNode.left) &&
        assignmentNode.left.property &&
        assignmentNode.left.property.name === '_functions' &&
        types.isThisExpression(assignmentNode.left.object)
}

function callerClass() {
    return parse(DynamicPolyfillCaller.toString());
}

function callerInstance() {
    return types.variableDeclaration(
        'var',
        [
            types.variableDeclarator(
                types.identifier("_dpf"),
                types.newExpression(
                    types.identifier("DynamicPolyfillCaller"),
                    []
                )
            )
        ]
    )
}

module.exports = {
    assignmentIsPolyfill,
    callExpressionIsPolyfill,
    assignmentIsFunctionsDeclaration,
    callerClass,
    callerInstance,
    callExpressionIsPolyfillDeclaration
}