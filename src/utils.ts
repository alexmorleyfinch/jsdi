import {Graph} from './Graph';
import {GraphNode} from './GraphNode';
import {MakePlaceholder, RefPlaceholder} from './placeholders';
import {Constructor} from './types';

export function buildGraph(definition: object): Graph {
  const graph = new Graph();

  for (const nextMake of recurseObjectForPlaceholder<MakePlaceholder>(definition, MakePlaceholder)) {
    const node = new GraphNode(nextMake.key.join('.'));

    for (const nextRef of recurseObjectForPlaceholder<RefPlaceholder>(nextMake.value.args, RefPlaceholder)) {
      const existingNode = graph.getNode(nextRef.value.name);

      if (existingNode) {
        graph.removeNode(existingNode);
        node.addNode(existingNode);
      } else {
        node.addNode(new GraphNode(nextRef.value.name));
      }
    }

    graph.addNode(node);
  }

  return graph;
}

export function processArgs(definition: object, args: any[]) {
  const newArgs = [...args];
  for (const nextRef of recurseObjectForPlaceholder<RefPlaceholder>(args, RefPlaceholder)) {
    const refValue = getIn(definition, nextRef.value.name.split('.'));
    setIn(newArgs, nextRef.key, refValue);
  }
  return newArgs;
}

export function setIn(start: object, keys: string[], value: any) {
  let theRef: {[key: string]: any} = start;
  const lastKey: string | undefined = keys.pop();
  keys.forEach((key: string) => (theRef = theRef[key]));

  if (typeof lastKey === 'string') {
    theRef[lastKey] = value;
  }
}
export function getIn(start: object, keys: string[]) {
  let theRef: {[key: string]: any} = start;
  keys.forEach((key: string) => (theRef = theRef[key]));
  return theRef;
}

function* recursiveGenerator(object: any, keys: string[] = []): IterableIterator<{key: string[]; value: any}> {
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

function* recurseObjectForPlaceholder<T>(
  object: object,
  ctor: Constructor<T>,
): IterableIterator<{key: string[]; value: T}> {
  for (const {value, key} of recursiveGenerator(object)) {
    if (value instanceof ctor) {
      yield {key, value};
    }
  }
}

function isPlainObject(obj: any) {
  if (typeof obj !== 'object' || obj === null) return false;

  const proto = Object.getPrototypeOf(obj);
  return proto !== null && Object.getPrototypeOf(proto) === null;
}
