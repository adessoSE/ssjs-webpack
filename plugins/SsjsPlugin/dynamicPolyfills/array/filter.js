const { parse } = require('@babel/parser');


function arrayFilter(array, callbackFn) {
  var arr = [];
  for (var i = 0; i < array.length; i++) {
    if (callbackFn.call(array, array[i], i, array)) {
      arr.push(array[i]);
    }
  }
  return arr;
};

module.exports = parse(arrayFilter.toString());