function DynamicPolyfillCaller(callee) {
    
    this.callee = callee;

    this.getType = function () {
        if (this.callee === Array || Object.prototype.toString.call(this.callee) === '[object Array]') {
            return 'array';
        }
        else if (this.callee === Object || (Object.prototype.toString.call(this.callee) === '[object Object]' && typeof this.callee !== 'function')) {
            return 'object';
        }
        else if (this.callee === String || typeof this.callee === 'string') {
            return 'string';
        }
        else if (this.callee === Number || typeof this.callee === 'number') {
            return 'number';
        }
        return false;
    }
    this._functions = {};
    this.getFunction = function (funcName) {
        return this._functions[funcName][this.getType()]
    }
    return this;
}

function _dpfcCall(callee, funcName) {
    var funcBind = function(ctx) {
        var fn = this;
        return function() {
            fn.apply(ctx, arguments);
        };
    };
    var _dpfc = new DynamicPolyfillCaller(callee);
    var call = _dpfc.getFunction(funcName);
    call.funcBind = function(ctx) {
        var fn = this;
        return function() {
            fn.apply(ctx, arguments);
        };
    };
    return call.funcBind(callee);
}

module.exports = { DynamicPolyfillCaller, _dpfcCall };