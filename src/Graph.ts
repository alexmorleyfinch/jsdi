import {GraphNode} from './GraphNode';

export class Graph {
  topLevelNodes: GraphNode[];

  constructor() {
    this.topLevelNodes = [];
  }

  // calls a callback on each node
  // iterates nodes depth first
  forEachDepthFirst(callback: (node: GraphNode) => void) {
    this.topLevelNodes.forEach((node) => {
      node.forEachDepthFirst(callback);
    });
  }

  isCircular() {
    return this.topLevelNodes.some((node) => node.isCircular());
  }

  addNode(node: GraphNode) {
    this.topLevelNodes.push(node);
  }

  getNode(id: string): GraphNode | null {
    for (let i = 0; i < this.topLevelNodes.length; i++) {
      if (this.topLevelNodes[i].id === id) {
        return this.topLevelNodes[i];
      }
    }
    return null;
  }

  removeNode(node: GraphNode): void {
    const index = this.topLevelNodes.indexOf(node);

    if (index >= 0) {
      this.topLevelNodes.splice(index, 1);
    }
  }
}
