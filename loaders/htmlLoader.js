module.exports = (input) => {
    return `export default({
        display: function(){Write(TreatAsContent('${input.replace(/\>[\r\n ]+\</g, "><")
    .replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ')
    .replace(/'/gi, "\\'")
    .trim()}'))}
    })`;
};