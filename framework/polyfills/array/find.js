if (!Array.prototype.find) {
  Array.prototype.find = function(callback, thisArg) {
    for (var i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) return this[i];
    }
    return undefined;
  };
}
