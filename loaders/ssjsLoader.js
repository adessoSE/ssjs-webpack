const replacementPatterns = [
    {
        pattern: /async/gi,
        replacement: ''
    },
    {
        pattern: /await/gi,
        replacement: ''
    },
];

module.exports = (input) => {
    return replacementPatterns.reduce((acc, curr) => {
        return acc.replace(curr.pattern, curr.replacement);
    }, input);
};