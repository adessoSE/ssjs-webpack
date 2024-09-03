Object.values = function (obj) {
  var values = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && prop != "_type") {
      values.push(obj[prop]);
    }
  }
  return values;
};
