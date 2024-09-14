module.exports = (input) => {
    return `
export default {
    display: function () {
        Write(
            TreatAsContent(
                Platform.Function.Base64Decode(
                    '${Buffer.from(input).toString('base64')}'
                )
            )
        )
    }
}
    `;
};
