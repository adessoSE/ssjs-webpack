const { parse } = require('@babel/parser');

const objectValues = parse(`
function objectValues(obj) {
    var values = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) && prop != "_type") {
        values.push(obj[prop]);
      }
    }
    return values;
  };
`);

module.exports = objectValues;
