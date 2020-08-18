class BasePerson {
  constructor() {
    return new Proxy(this, withGettersSetters);
  }
}

class Person extends BasePerson {
  constructor(firstName) {
    super();
    this.firstName = firstName;
  }
}

const withGettersSetters = {
  get(object, property) {
    if (property.startsWith("get")) {
      const objectProperty = parseProperty(property);

      return () => object[objectProperty];
    }

    if (property.startsWith("set")) {
      const objectProperty = parseProperty(property);
      return newValue => (object[objectProperty] = newValue);
    }

    return object[property];
  }
};

const parseProperty = methodName => {
  // getFirstName
  const getter = methodName.slice(3); // FirstName

  const firstLetter = getter[0].toLowerCase();
  const rest = getter.slice(1);
  return firstLetter + rest; // firstName
};

const person = new Person("Quang");

const name = person.getFirstName();
console.log(`test getter ${name}`);

person.setFirstName("Huy");
const newName = person.getFirstName();
console.log(`after setter ${newName}`);
