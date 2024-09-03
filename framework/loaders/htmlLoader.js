module.exports = (input) => {
    return `
    const display = function (values = {}) {
        for (var prop in values) {
            Variable.SetValue("@" + prop, values[prop]);
        }
        Write(
            TreatAsContent(
                Platform.Function.Base64Decode(
                    '${Buffer.from(input).toString('base64')}'
                )
            )
        ) 
    }`;
};