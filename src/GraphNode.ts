export class GraphNode {
  id: string;
  nodes: GraphNode[];

  constructor(id: string) {
    this.id = id;
    this.nodes = [];
  }

  forEachDepthFirst(callback: (node: GraphNode) => void) {
    this.nodes.forEach((node) => {
      node.forEachDepthFirst(callback);
    });
    callback(this);
  }

  addNode(node: GraphNode) {
    this.nodes.push(node);
  }

  removeNode(node: GraphNode): void {
    const index = this.nodes.indexOf(node);

    if (index >= 0) {
      this.nodes.splice(index, 1);
    }
  }

  getNode(id: string): GraphNode | null {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === id) {
        return this.nodes[i];
      }
    }
    return null;
  }

  isCircular(): boolean {
    const deps = this.getAllNodeIds();
    const containsKey = deps.includes(this.id);

    return containsKey || this.nodes.some((node) => node.isCircular());
  }

  getAllNodeIds() {
    let nodeIds = this.nodes.map((node) => node.id);

    this.nodes.forEach((node) => {
      nodeIds = nodeIds.concat(node.getAllNodeIds());
    });

    return nodeIds;
  }
}
