const { parse } = require('@babel/parser');

const arrayIncludes = parse(`
function arrayIncludes(array, val) {
  for (i = 0; i < array.length; i++) {
    if (array[i] == val) {
      return true;
    }
  }
  return false;
};
`);

module.exports = arrayIncludes;