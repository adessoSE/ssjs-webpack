function DynamicPolyfillCaller() {
    this.getType = function (callee) {
        if (callee === Array || Object.prototype.toString.call(callee) === '[object Array]') {
            return 'array';
        }
        else if (callee === Object || (Object.prototype.toString.call(callee) === '[object Object]' && typeof callee !== 'function')) {
            return 'object';
        }
        else if (callee === String || typeof callee === 'string') {
            return 'string';
        }
        else if (callee === Number || typeof callee === 'number') {
            return 'number';
        }
        return false;
    }
    this._functions = {};
    this.getFunction = function(callee, funcName) {
        return this._functions[funcName][this.getType(callee)]
    }
    return this;
}


module.exports = DynamicPolyfillCaller;