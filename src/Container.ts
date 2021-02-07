import {GraphNode} from './GraphNode';
import {MakePlaceholder, RefPlaceholder} from './placeholders';
import {getIn, recurseObjectForPlaceholder, setIn} from './utils';

export class Container {
  private definition: object;
  private graph: GraphNode;

  constructor(definition: object) {
    // create a clone of the input so we don't accidentally modify it
    this.definition = {...definition};

    // create a root graph node that we used to build our dependency tree
    this.graph = new GraphNode(''); // This is the root graph node so it has no `id`

    // search for RefPlaceholders in the definition and add them to the dependency graph
    for (const nextRef of recurseObjectForPlaceholder<RefPlaceholder>(definition, RefPlaceholder)) {
      this.graph.addNode(new GraphNode(nextRef.key.join('.')));
    }

    // search for MakePlaceholders in the definition and add them to the dependency graph
    for (const nextMake of recurseObjectForPlaceholder<MakePlaceholder>(definition, MakePlaceholder)) {
      const node = new GraphNode(nextMake.key.join('.'));

      // there could be RefPlaceholders inside the class constructor arg list that we must add to the dependency graph
      for (const nextRef of recurseObjectForPlaceholder<RefPlaceholder>(nextMake.value.args, RefPlaceholder)) {
        const existingNode = this.graph.getNode(nextRef.value.name);

        if (existingNode) {
          this.graph.removeNode(existingNode);
          node.addNode(existingNode);
        } else {
          node.addNode(new GraphNode(nextRef.value.name));
        }
      }

      this.graph.addNode(node);
    }
  }

  getOutput() {
    return this.definition;
  }

  replacePlaceholders() {
    // we now have the dependency graph
    if (this.graph.isCircular()) {
      throw new Error('Circular dependencies error');
    }

    // the graph has been verified as not being circular,
    // meaning we can safely build it from the leaf nodes up.
    this.graph.forEachDepthFirst((node: GraphNode) => {
      if (!node.id) return; // when we buildGraph, the root graph node has `id` of ""

      const defKey = node.id.split('.');
      const value = getIn(this.definition, defKey);

      if (value instanceof MakePlaceholder) {
        // we can safely make this because it is in order
        const newArgs = [...value.args];

        for (const nextRef of recurseObjectForPlaceholder<RefPlaceholder>(value.args, RefPlaceholder)) {
          const refValue = getIn(this.definition, nextRef.value.name.split('.'));
          setIn(newArgs, nextRef.key, refValue);
        }

        const instance = new value.type(...newArgs);

        setIn(this.definition, defKey, instance);
      }

      if (value instanceof RefPlaceholder) {
        const refValue = getIn(this.definition, value.name.split('.'));

        setIn(this.definition, defKey, refValue);
      }
    });
  }
}
