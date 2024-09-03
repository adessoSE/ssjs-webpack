if(!Object.create) {
    Object.create = function(proto) {
        var object = (function() {return this})();
        object.prototype = proto;
        return object;
    }
}