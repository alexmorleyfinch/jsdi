import Graph from './Graph';
import GraphNode from './GraphNode';

export const MAKE_KEY = '___make___';
export const REF_KEY = '___ref___';

function isMake(value) {
  return value && value[MAKE_KEY];
}
function isRef(value) {
  return value && value[REF_KEY];
}

export function buildGraph(definition) {
  const graph = new Graph();

  for (let nextMake of recurseObjectForMarkers(definition, {make: true})) {
    const node = new GraphNode(nextMake.key.join('.'));

    for (let nextRef of recurseObjectForMarkers(nextMake.value.args, {ref: true})) {
      const refNode = new GraphNode(nextRef.value[REF_KEY]);

      if (graph.hasTopLevelNode(refNode.id)) {
        node.addNode(graph.removeTopLevel(refNode.id));
      } else {
        node.addNode(refNode);
      }
    }

    graph.topLevelNodes.push(node);
  }

  return graph;
}

export function processArgs(definition, args) {
  const newArgs = [...args];
  for (let nextRef of recurseObjectForMarkers(args, {ref: true})) {
    const refValue = getIn(definition, nextRef.value[REF_KEY].split('.'));
    setIn(newArgs, nextRef.key, refValue);
  }
  return newArgs;
}

function setIn(start, keys, value) {
  let theRef = start;
  let lastKey = keys.pop();
  keys.forEach((key) => (theRef = theRef[key]));
  theRef[lastKey] = value;
}
function getIn(start, keys) {
  let theRef = start;
  keys.forEach((key) => (theRef = theRef[key]));
  return theRef;
}

function* recursiveGenerator(object, keys = []) {
  if (Array.isArray(object)) {
    for (let i = 0; i < object.length; i++) {
      let key = [...keys, i];
      yield* recursiveGenerator(object[i], key);
    }
  } else if (isObject(object) && !(isMake(object) || isRef(object))) {
    for (let name in object) {
      let key = [...keys, name];
      yield* recursiveGenerator(object[name], key);
    }
  } else {
    yield {key: keys, value: object};
  }
}

function* recurseObjectForMarkers(object, {make = false, ref = false}) {
  for (let {value, key} of recursiveGenerator(object)) {
    if ((ref && isRef(value)) || (make && isMake(value))) {
      yield {key, value};
    }
  }
}

function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
