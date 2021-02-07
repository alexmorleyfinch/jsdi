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

test('Should copy a reference from root', () => {
  const input = {
    string: 'string',
    myRef: ref('string'),
  };

  debugger;
  const output = container(input);

  expect(output.myRef).toBe(input.string);
});

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

test('Should copy a deep reference from a make', () => {
  const MyClass = class {
    constructor(arg1) {
      this.arg1 = arg1;
    }
  };

  const input = {
    string: {
      deep: 'string',
    },

    myClass: make(MyClass, [{very: [{deep: ref('string')}]}]),
  };

  const output = container(input);

  expect(output.myClass).toBeInstanceOf(MyClass);
  expect(output.myClass).toHaveProperty('arg1');
  expect(output.myClass.arg1).toEqual({
    very: [
      {
        deep: {
          deep: 'string',
        },
      },
    ],
  });
});

test('Should ref a make', () => {
  const MyClass = class {
    constructor(arg1, arg2) {
      this.arg1 = arg1;
      this.arg2 = arg2;
    }
  };

  const input = {
    string1: 'string1',
    string2: 'string2',

    myClass1: make(MyClass, [ref('string1')]),

    myClass2: make(MyClass, [ref('string2')]),

    myClass3: make(MyClass, [ref('myClass1'), ref('myClass2')]),
  };

  const output = container(input);

  expect(output.myClass1).toBeInstanceOf(MyClass);
  expect(output.myClass1.arg1).toEqual(input.string1);

  expect(output.myClass2).toBeInstanceOf(MyClass);
  expect(output.myClass2.arg1).toEqual(input.string2);

  expect(output.myClass3).toBeInstanceOf(MyClass);
  expect(output.myClass3.arg1).toBe(output.myClass1);
  expect(output.myClass3.arg2).toBe(output.myClass2);
});

// test('Should make a make', () => {
//   const MyClass = class {
//     constructor(arg1, arg2) {
//       this.arg1 = arg1;
//       this.arg2 = arg2;
//     }
//   };

//   const input = {
//     string1: 'string1',
//     string2: 'string2',

//     myClass: make(MyClass, [make(MyClass, [ref('string1')]), make(MyClass, [ref('string2')])]),
//   };

//   const output = container(input);

//   expect(output.myClass).toBeInstanceOf(MyClass);

//   expect(output.myClass.arg1).toBeInstanceOf(MyClass);
//   expect(output.myClass.arg1.arg1).toBe(input.string1);

//   expect(output.myClass.arg2).toBeInstanceOf(MyClass);
//   expect(output.myClass.arg2.arg1).toBe(input.string2);
// });
