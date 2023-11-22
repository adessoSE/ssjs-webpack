Array.prototype.forEach = function (callback) {
  for (var i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};
