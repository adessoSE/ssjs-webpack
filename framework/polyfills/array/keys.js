if (!Array.prototype.keys) {
    Array.prototype.keys = function () {
      var k,
        a = [],
        nextIndex = 0,
        ary = this;
      k = ary.length;
      while (k > 0) a[--k] = k;
      a.next = function () {
        return nextIndex < ary.length ? {
          value: nextIndex++,
          done: false
        } : {
          done: true
        };
      };
      return a;
    };
  }