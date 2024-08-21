
const traverse = require('@babel/traverse').default;
const { parse } = require('@babel/parser');
const types = require('@babel/types');
const generate = require('@babel/generator').default;


const polyfills = [
    {
        function: 'map',
        replacement: 'arrayMap',
        functionDeclaration: require('./array/map')
    },
    {
        function: 'reduce',
        replacement: 'arrayReduce',
        functionDeclaration: require('./array/reduce')
    },
    {
        function: 'forEach',
        replacement: 'arrayForEach',
        functionDeclaration: require('./array/forEach')
    },
    {
        function: 'filter',
        replacement: 'arrayFilter',
        functionDeclaration: require('./array/filter')
    },
    {
        function: 'includes',
        replacement: 'arrayIncludes',
        functionDeclaration: require('./array/includes')
    },
    {
        function: 'keys',
        replacement: 'objectKeys',
        functionDeclaration: require('./object/keys')
    },
    {
        function: 'values',
        replacement: 'objectValues',
        functionDeclaration: require('./object/values')
    },
]

function dynamicPolyfills(compilation, options) {
    const js = compilation.assets[options.output].source();
    const ast = parse(js);
    traverse(ast, {
        CallExpression(path) {
            polyfills.map((polyfill) => {
                if (
                    types.isMemberExpression(path.node.callee) &&
                    path.node.callee.property.name === polyfill.function
                ) {
                    if(!polyfill.import) {
                        ast.program.body.unshift(polyfill.functionDeclaration)
                    }
                    polyfill.import = true;
                    const obj = path.node.callee.object;
                    const callbackArg = path.node.arguments[0];
                    if(!(obj.type == 'Identifier' && obj.name == 'Object')){
                        path.replaceWith(
                            types.callExpression(
                                types.identifier(polyfill.replacement),
                                [obj, callbackArg]
                            )
                        );
                    } else {
                        path.replaceWith(
                            types.callExpression(
                                types.identifier(polyfill.replacement),
                                [callbackArg]
                            )
                        );
                    }
                    
                }
            })
        }
    })
    const newContent = generate(ast).code;
    compilation.assets[options.output] = {
        source: () => newContent,
        size: () => Buffer.byteLength(newContent, "utf8")
    }
}

module.exports = dynamicPolyfills;