if(!Object.defineProperties) {
    Object.defineProperties = function(obj, props) {
        for(propName in props) {
            obj[propName] = props[propName].descriptor.value;
            return obj;
        }
        
    }
}