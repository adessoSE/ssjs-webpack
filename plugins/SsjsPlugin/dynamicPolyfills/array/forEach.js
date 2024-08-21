const { parse } = require('@babel/parser');

const arrayForEach = parse(`
function arrayForEach(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i]);
  }
};
`);

module.exports = arrayForEach;