const {container, make, ref} = require('../src/index');

test('Should preserve input object', () => {
  const input = {
    string: 'string',
    number: 10,
    boolean: true,
    infinity: Infinity,
    nan: NaN,
    object: {},
    array: [],
    regex: new RegExp('[A-Z]+'),
  };

  const output = container(input);

  expect(input).toEqual(output);
});

test('Should instanciate class', () => {
  const MyClass = class {};

  const input = {
    string: 'string',
    myClass: make(MyClass),
  };

  const output = container(input);

  expect(output.myClass).toBeInstanceOf(MyClass);
});

// test('Should copy a reference from root', () => {
//   const input = {
//     string: 'string',
//     myRef: ref('string'),
//   };

//   const output = container(input);

//   expect(output.myRef).toBe(input.string);
// });

test('Should copy a reference from a make', () => {
  const MyClass = class {
    constructor(arg1) {
      this.arg1 = arg1;
    }
  };

  const input = {
    string: 'string',
    myClass: make(MyClass, [ref('string')]),
  };

  const output = container(input);

  expect(output.myClass).toBeInstanceOf(MyClass);
  expect(output.myClass).toHaveProperty('arg1');
  expect(output.myClass.arg1).toBe(input.string);
});
