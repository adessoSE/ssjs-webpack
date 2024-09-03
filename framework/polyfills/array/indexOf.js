if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(item, fromIndex) {
    var len = this.length >>> 0;
    fromIndex = fromIndex || 0;
    if (fromIndex < 0) fromIndex = Math.max(0, len + fromIndex);
    for (var i = fromIndex; i < len; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
}
