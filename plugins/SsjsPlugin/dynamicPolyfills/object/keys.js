const { parse } = require('@babel/parser');

const objectKeys = parse(`
function objectKeys(obj) {
    var values = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) && prop != "_type") {
        values.push(prop);
      }
    }
    return values;
  };
`);

module.exports = objectKeys;
