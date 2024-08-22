const { parse } = require('@babel/parser');


function arrayForEach(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i]);
  }
};

module.exports = parse(arrayForEach.toString());