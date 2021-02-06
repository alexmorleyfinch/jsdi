import {Graph} from './Graph';
import {GraphNode} from './GraphNode';
import {MakePlaceholder, RefPlaceholder} from './placeholders';

export function buildGraph(definition: object): Graph {
  const graph = new Graph();

  // for (const nextRef of recurseObjectForMarkers(definition, {ref: true})) {
  //   if (nextRef.value instanceof RefPlaceholder) {
  //     const refNode = new GraphNode(nextRef.value.name);

  //     if (graph.hasTopLevelNode(refNode.id)) {
  //       const newNode = graph.removeTopLevel(refNode.id);

  //       if (newNode == null) {
  //         throw new Error('Call to `ref` contained a string that points to a non-existent node');
  //       }

  //       graph.topLevelNodes.push(newNode);
  //     } else {
  //       graph.topLevelNodes.push(refNode);
  //     }
  //   }
  // }

  for (const nextMake of recurseObjectForMarkers(definition, {make: true})) {
    if (nextMake.value instanceof MakePlaceholder) {
      const node = new GraphNode(nextMake.key.join('.'));

      for (const nextRef of recurseObjectForMarkers(nextMake.value.args, {ref: true})) {
        if (nextRef.value instanceof RefPlaceholder) {
          const refNode = new GraphNode(nextRef.value.name);

          if (graph.hasTopLevelNode(refNode.id)) {
            const newNode = graph.removeTopLevel(refNode.id);

            if (newNode == null) {
              throw new Error('Call to `ref` contained a string that points to a non-existent node');
            }

            node.addNode(newNode);
          } else {
            node.addNode(refNode);
          }
        }
      }

      graph.topLevelNodes.push(node);
    }
  }

  return graph;
}

export function processArgs(definition: object, args: any[]) {
  const newArgs = [...args];
  for (const nextRef of recurseObjectForMarkers(args, {ref: true})) {
    if (nextRef.value instanceof RefPlaceholder) {
      const refValue = getIn(definition, nextRef.value.name.split('.'));
      setIn(newArgs, nextRef.key, refValue);
    }
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
      const key = [...keys, i + ''];
      yield* recursiveGenerator(object[i], key);
    }
  } else if (isObject(object) && !(object instanceof MakePlaceholder || object instanceof RefPlaceholder)) {
    for (const name in object) {
      const key = [...keys, name];
      yield* recursiveGenerator(object[name], key);
    }
  } else {
    yield {key: keys, value: object};
  }
}

function* recurseObjectForMarkers(object: object, {make = false, ref = false}) {
  for (const {value, key} of recursiveGenerator(object)) {
    if ((ref && value instanceof RefPlaceholder) || (make && value instanceof MakePlaceholder)) {
      yield {key, value};
    }
  }
}

function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
