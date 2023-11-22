Array.prototype.map = function (callbackFn) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    arr.push(callbackFn(this[i], i, this));
  }
  return arr;
};
