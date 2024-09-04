if(!Object.defineProperties) {
    Object.defineProperties = function(obj, props) {
        for(propName in props) {
            obj = Object.defineProperty(obj, propName, props[propName])
        }
        return obj;
    }
}