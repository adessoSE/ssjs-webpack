export default({
    run: (code) => {
        const ampBlock = '\%\%[' + code + ']\%\%';
        TreatAsContent(ampBlock);
        return Variable.GetValue('@response');
    }
})