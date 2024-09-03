Object.keys = function (obj) {
  var keys = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && prop != "_type") {
      keys.push(prop);
    }
  }
  return keys;
};
