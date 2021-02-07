import {Constructor} from './types';

/**
 * Used to set a deep value in an object given an array of keys.
 */
export function setIn(start: object, keys: string[], value: any) {
  let theRef: {[key: string]: any} = start;

  const lastKey: string | undefined = keys.pop();

  keys.forEach((key: string) => {
    theRef = theRef[key];
  });

  if (typeof lastKey === 'string') {
    theRef[lastKey] = value;
  }
}

/**
 * Used to get a deep value in an object given an array of keys.
 */
export function getIn(start: object, keys: string[]) {
  let theRef: {[key: string]: any} = start;

  keys.forEach((key: string) => {
    theRef = theRef[key];
  });

  return theRef;
}

/**
 * Used to recursively search an `object` and yield items that are instances of a constructor `ctor`
 */
export function* recurseObjectForPlaceholder<T>(
  object: object,
  ctor: Constructor<T>,
): IterableIterator<{key: string[]; value: T}> {
  for (const {key, value} of recursiveGenerator(object)) {
    if (value instanceof ctor) {
      yield {key, value};
    }
  }
}

/**
 * Used to recursively yield values from an object. Each yields a `value` and a `key` array
 * that points to where the value came from.
 */
export function* recursiveGenerator(object: any, keys: string[] = []): IterableIterator<{key: string[]; value: any}> {
  if (Array.isArray(object)) {
    for (let i = 0; i < object.length; i++) {
      const key = [...keys, i.toString()];
      yield* recursiveGenerator(object[i], key);
    }
  } else if (isPlainObject(object)) {
    for (const name in object) {
      const key = [...keys, name];
      yield* recursiveGenerator(object[name], key);
    }
  } else {
    yield {key: keys, value: object};
  }
}

/**
 * Used to check if any value is a plain object instance
 */
export function isPlainObject(obj: any) {
  if (typeof obj !== 'object' || obj === null) return false;

  const proto = Object.getPrototypeOf(obj);
  return proto === null || proto === Object.prototype;
}
