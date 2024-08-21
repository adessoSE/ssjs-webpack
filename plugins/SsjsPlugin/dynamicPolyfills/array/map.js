const { parse } = require('@babel/parser');

const arrayMap = parse(`
function arrayMap(array, callbackFn) {
  var arr = [];
  for (var i = 0; i < array.length; i++) {
    arr.push(callbackFn(array[i], i, array));
  }
  return arr;
};
`);

module.exports = arrayMap;