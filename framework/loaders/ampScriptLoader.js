module.exports = (input) => {
  return `export default(
    {
      run: function(){
            TreatAsContent(
                '\\%\\%['+Platform.Function.Base64Decode(
                    '${Buffer.from(input).toString('base64')}'
                )+']\\%\\%'
            )
            return Variable.GetValue('@response');
      }
    }
  );`;
};
