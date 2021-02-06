import {Graph} from './Graph';
import {GraphNode} from './GraphNode';
import {AbstractPlaceholder, MakePlaceholder, RefPlaceholder} from './placeholders';
import {Constructor} from './types';
import {buildGraph, getIn, processArgs, setIn} from './utils';

export function container(input: object): object {
  const definition = {...input};
  const graph: Graph = buildGraph(definition);

  // we now have the dependency graph
  if (graph.isCircular()) {
    throw new Error('Circular dependencies error');
  }

  // the graph has been verified as not being circular,
  // meaning we can safely build it from the leaf nodes up.
  graph.forEachDepthFirst((node: GraphNode) => {
    const defKey = node.id.split('.');
    const value = getIn(definition, defKey);

    if (value instanceof MakePlaceholder) {
      // we can safely make this because it is in order
      const instance = new value.type(...processArgs(definition, value.args));

      setIn(definition, defKey, instance);
    }
  });

  return definition;
}

export function make(type: Constructor, args: any[] = []): AbstractPlaceholder {
  return new MakePlaceholder(type, args);
}

export function ref(name: string): AbstractPlaceholder {
  return new RefPlaceholder(name);
}
