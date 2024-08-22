const { parse } = require('@babel/parser');

function arrayReduce(array, callbackFn, initialValue) {
  var accumulator = initialValue;
  for (var i = 0; i < array.length; i++) {
    if (accumulator !== undefined) {
      accumulator = callbackFn.call(undefined, accumulator, array[i], i, array);
    } else {
      accumulator = array[i];
    }
  }
  return accumulator;
};

module.exports = parse(arrayReduce.toString());