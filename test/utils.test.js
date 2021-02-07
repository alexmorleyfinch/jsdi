const {setIn, getIn, isPlainObject} = require('../src/utils');

test('should setIn', () => {
  const obj = {
    hello: 'world',
    long: {
      chain: {
        of: {
          keys: null,
        },
      },
    },
  };

  setIn(obj, ['hello'], 'world!');
  expect(obj.hello).toBe('world!');

  setIn(obj, ['long', 'chain', 'of', 'keys'], 'hello');
  expect(obj.long.chain.of.keys).toBe('hello');
});

test('should getIn', () => {
  const obj = {hello: 'world', long: {chain: {of: {keys: 'hello'}}}};

  expect(getIn(obj, ['hello'])).toBe('world');
  expect(getIn(obj, ['long', 'chain', 'of'])).toEqual({keys: 'hello'});
  expect(getIn(obj, ['long', 'chain', 'of', 'keys'])).toBe('hello');
});

test('should determine if isPlainObject', () => {
  expect(isPlainObject(null)).toBe(false);
  expect(isPlainObject(123)).toBe(false);
  expect(isPlainObject('asdf')).toBe(false);
  expect(isPlainObject(new RegExp('[a-z]+'))).toBe(false);
  expect(isPlainObject([])).toBe(false);

  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject(new Object())).toBe(true);
  expect(isPlainObject(Object.create(null))).toBe(true);
});
