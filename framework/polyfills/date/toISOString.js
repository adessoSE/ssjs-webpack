if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () {
      var pad = function (number) {
        if (number < 10) {
          return '0' + number;
        }
        return number;
      };
      return this.getUTCFullYear() + '-' + pad(this.getUTCMonth() + 1) + '-' + pad(this.getUTCDate()) + 'T' + pad(this.getUTCHours()) + ':' + pad(this.getUTCMinutes()) + ':' + pad(this.getUTCSeconds()) + '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
    };
  }