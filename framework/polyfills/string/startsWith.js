// String.prototype.startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    pos = pos || 0;
    return this.indexOf(search, pos) === pos;
  };
}
