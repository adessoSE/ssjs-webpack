if (!Array.prototype.every) {
  Array.prototype.every = function(callback, thisArg) {
    for (var i = 0; i < this.length; i++) {
      if (i in this && !callback.call(thisArg, this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}
