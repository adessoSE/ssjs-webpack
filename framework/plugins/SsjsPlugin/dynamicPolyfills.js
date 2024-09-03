
const traverse = require('@babel/traverse').default;
const { parse } = require('@babel/parser');
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const { camelCase } = require('lodash');

function assignmentParseLeft(left) {
    let obj;
    let prototype = false;
    if (left.object) {
        if (left.object.object && left.object.property && left.object.property.name === 'prototype') {
            obj = left.object.object.name;
            prototype = true;
        }
        else {
            obj = left.object.name;
        }
        if (["Array", "Object", "String", "Number"].includes(obj)) {
            return {
                type: obj,
                prototype: prototype,
                method: left.property.name
            }
        }
    }

    return false;
}

function loadPolyfill(p) {
    const data = fs.readFileSync(path.resolve(__dirname, `../../polyfills/${p}.js`), { encoding: 'utf8', flag: 'r' });
    const ast = parse(data);
    let polyfill;
    traverse(ast, {
        AssignmentExpression(path) {
            const node = path.node;
            const left = assignmentParseLeft(node.left);
            if (left) {
                const name = camelCase(`${left.type}  ${left.method}`);
                polyfill = {
                    function: left.method,
                    replacement: name,
                    functionDeclaration: types.variableDeclaration('var', [types.variableDeclarator(types.identifier(name), node.right)])
                }
            }

        }
    });
    return polyfill;
}

const polyfills = [
    'array/every',
    'array/filter',
    'array/find',
    'array/forEach',
    'array/includes',
    'array/indexOf',
    'array/isArray',
    'array/lastIndexOf',
    'array/map',
    'array/reduce',
    'array/reduceRight',
    'array/some',
    'object/create',
    'object/defineProperty',
    'object/defineProperties',
    'object/keys',
    'object/values',
    'string/endsWith',
    'string/startsWith',
    'string/trim',
].map(polyfill => loadPolyfill(polyfill));


function dynamicPolyfills(js) {
    const ast = parse(js);
    traverse(ast, {
        AssignmentExpression(path) {
            const leftParsed = assignmentParseLeft(path.node.left);
            if (leftParsed) {
                path.remove();
            }
        },
        CallExpression(path) {
            if (
                types.isMemberExpression(path.node.callee)
            )
                polyfills.map((polyfill) => {

                    if (
                        types.isMemberExpression(path.node.callee) &&
                        path.node.callee.property.name === polyfill.function
                    ) {
                        if (!polyfill.import) {
                            ast.program.body.unshift(polyfill.functionDeclaration)
                        }
                        polyfill.import = true;
                        const object = path.node.callee.object;
                        if (!(types.isIdentifier(object) && ["Array", "Object", "String", "Number"].includes(object.name))) {
                            const newCallee = types.memberExpression(types.identifier(polyfill.replacement), types.identifier('call'));
                            const newArguments = [path.node.callee.object, ...path.node.arguments];
                            path.replaceWith(
                                types.callExpression(
                                    newCallee,
                                    newArguments
                                )
                            );
                        } else {
                            path.replaceWith(
                                types.callExpression(
                                    types.identifier(polyfill.replacement),
                                    [...path.node.arguments]
                                )
                            );
                        }

                    }
                })
        }
    })
    const newContent = generate(ast).code;
    return newContent;
}

module.exports = dynamicPolyfills;