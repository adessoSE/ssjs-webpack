if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callbackFn, initialValue) {
    var accumulator = initialValue;
    for (var i = 0; i < this.length; i++) {
      if (accumulator !== undefined) {
        accumulator = callbackFn.call(undefined, accumulator, this[i], i, this);
      } else {
        accumulator = this[i];
      }
    }
    return accumulator;
  };

}
