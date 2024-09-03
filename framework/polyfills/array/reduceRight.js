if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function (callbackFn, initialValue) {
      var accumulator = initialValue;
      for (var i = this.length - 1; i >= 0; i--) {
        if (accumulator !== undefined) {
          accumulator = callbackFn.call(undefined, accumulator, this[i], i, this);
        } else {
          accumulator = this[i];
        }
      }
      return accumulator;
    };
  
  }
  