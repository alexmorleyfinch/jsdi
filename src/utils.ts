import {Constructor} from './types';

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
export function getIn(start: object, keys: string[]) {
  let theRef: {[key: string]: any} = start;

  keys.forEach((key: string) => {
    theRef = theRef[key];
  });

  return theRef;
}

export function* recurseObjectForPlaceholder<T>(
  object: object,
  ctor: Constructor<T>,
): IterableIterator<{key: string[]; value: T}> {
  for (const {value, key} of recursiveGenerator(object)) {
    if (value instanceof ctor) {
      yield {key, value};
    }
  }
}

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

export function isPlainObject(obj: any) {
  if (typeof obj !== 'object' || obj === null) return false;

  const proto = Object.getPrototypeOf(obj);
  return proto === null || proto === Object.prototype;
}
