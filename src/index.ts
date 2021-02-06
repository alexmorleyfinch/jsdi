import {GraphNode} from './GraphNode';
import {Make, Ref} from './placeholders';
import {Constructor} from './types';
import {buildGraph, getIn, processArgs, setIn} from './utils';

export function container(inputDef: object) {
  const definition = {...inputDef};
  const graph = buildGraph(definition);

  // we now have the dependency graph
  if (graph.isCircular()) {
    throw new Error('Circular dependencies error');
  }

  // the graph has been verified as not being circular,
  // meaning we can safely build it from the leaf nodes up.
  graph.forEachDepthFirst((node: GraphNode) => {
    const defKey = node.id.split('.');
    const value = getIn(definition, defKey);

    if (value instanceof Make) {
      // we can safely make this because it is in order
      const instance = new value.type(...processArgs(definition, value.args));

      setIn(definition, defKey, instance);
    }
  });

  return definition;
}

export function make(type: Constructor, args: any[] = []) {
  return new Make(type, args);
}

export function ref(name: string) {
  return new Ref(name);
}
