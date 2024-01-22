Array.prototype.includes = function (val) {
  for (i = 0; i < this.length; i++) {
    if (this[i] == val) {
      return true;
    }
  }
  return false;
};
