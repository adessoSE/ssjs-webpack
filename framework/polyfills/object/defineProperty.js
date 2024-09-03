if(!Object.defineProperty) {
    Object.defineProperty = function(obj, prop, descriptor) {
        obj[prop] = descriptor.value;
        return obj;
    }
}