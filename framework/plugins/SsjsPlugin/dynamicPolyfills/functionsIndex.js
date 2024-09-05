const fs = require('fs');
const path = require('path');

const paths = fs.readdirSync(
    path.resolve(__dirname, '../../../polyfills'),
    { recursive: true }
).filter(
    entry => /(?<!index)\.js$/.test(entry)
);

function parsePath(p) {
    const [type, func, ext] = p.match(/\w+/g);
    return {
        p,
        type,
        func,
        ext,
    }
}

const index = paths.map(entry => parsePath(entry));

module.exports = index;