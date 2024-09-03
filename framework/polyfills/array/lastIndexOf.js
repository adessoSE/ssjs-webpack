if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(item, fromIndex) {
    var len = this.length >>> 0;
    fromIndex = fromIndex == null ? len - 1 : fromIndex;
    if (fromIndex < 0) fromIndex = Math.max(0, len + fromIndex);
    for (var i = fromIndex; i >= 0; i--) {
      if (this[i] === item) return i;
    }
    return -1;
  };
}
