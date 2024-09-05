if (!String.prototype.substr) {
    String.prototype.substr = function (a, b) {
      var s = !_dpf.getFunction(Number, "isInteger").call(Number, a) ? 0 : a,
        l = typeof b == 'undefined' ? null : s > 0 && b > 0 ? s + b : b;
      if (s < 0) {
        s = this.length + a;
        l = l < 0 ? 0 : s + l;
      }
      return typeof b == 'undefined' && b != 0 && _dpf.getFunction(Number, "isInteger").call(Number, a) ? this.substring(s) : l <= 0 || !_dpf.getFunction(Number, "isInteger").call(Number, l) ? "" : this.substring(s, l);
    };
  }