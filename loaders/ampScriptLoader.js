const replacementPatterns = [
  {
    pattern: /"/gi,
    replacement: '\\"',
  },
  {
    pattern: /\r.*?\n/gi,
    replacement: "\\n",
  },
  {
    pattern: /^/gi,
    replacement: '"',
  },
  {
    pattern: /$/gi,
    replacement: '"',
  },
];

module.exports = (input) => {
  rawInput = replacementPatterns.reduce((acc, curr) => {
    return acc.replace(curr.pattern, curr.replacement);
  }, input);
  return `export default(
    {
      run: function(){
        TreatAsContent('\%\%['+${rawInput}+']\%\%');
        return Variable.GetValue('@response');
      }
    }
  );`;
};
