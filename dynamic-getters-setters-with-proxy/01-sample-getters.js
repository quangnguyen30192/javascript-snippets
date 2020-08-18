class Person {
  constructor(firstName) {
    this.firstName = firstName;
  }
}

const withGetter = {
  get(object, property) {
    if (property.startsWith("get")) {
      // getFirstName
      const getter = property.slice(3); // FirstName

      const firstLetter = getter[0].toLowerCase();
      const rest = getter.slice(1);
      const fullProperty = firstLetter + rest; // firstName

      return () => object[fullProperty];
    }

    return object[property];
  }
};

const person = new Proxy(new Person("quang"), withGetter);

console.log(person.getFirstName());
