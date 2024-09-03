const person = {
    isHuman: false,
    printIntroduction: function () {
        Write(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    },
  };
  
  const me = Object.create(person);
  
  me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
  me.isHuman = true; // Inherited properties can be overwritten
  try{
    me.printIntroduction();
  } catch (err) {
    Write(Stringify(err))
  }
  
