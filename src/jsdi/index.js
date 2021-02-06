import {MAKE_KEY, REF_KEY, buildGraph, getIn, isMake, processArgs, setIn} from './utils';

export function container(inputDef) {
  const definition = {...inputDef};
  const graph = buildGraph(definition);

  // we now have the dependancy graph
  if (graph.isCircular()) {
    throw new Error('Circular dependancies error');
  }

  // the graph has been verified as not being circular,
  // meaning we can safely build it from the leaf nodes up.
  graph.forEachDepthFirst((node) => {
    const defKey = node.id.split('.');
    const value = getIn(definition, defKey);

    if (isMake(value)) {
      // we can safely make this because it is in order
      const instance = new value[MAKE_KEY](...processArgs(definition, value.args));

      setIn(definition, defKey, instance);
    }
  });

  return definition;
}

export function make(constructor, args = []) {
  return {[MAKE_KEY]: constructor, args};
}

export function ref(name) {
  return {[REF_KEY]: name};
}
