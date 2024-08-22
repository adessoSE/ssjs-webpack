module.exports = (input) => {
    return `export default({
        display: function(){Write(TreatAsContent(Platform.Function.Base64Decode('${Buffer.from(input/*.replace(/\>[\r\n ]+\</g, "><")
            .replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ')
            .replace(/'/gi, "\\'")
            .trim()*/).toString('base64')}')))}
    })`;
};