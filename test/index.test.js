const {container, make, ref} = require('../src/index.ts');

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
