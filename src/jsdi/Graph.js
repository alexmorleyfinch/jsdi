export default class Graph {
  constructor() {
    this.topLevelNodes = [];
  }

  // calls a callback on each node
  // iterates nodes depth first
  forEachDepthFirst(callback) {
    this.topLevelNodes.forEach(node => {
      node.forEachDepthFirst(callback);
    });
  }

  isCircular() {
    return this.topLevelNodes.some(node => node.isCircular());
  }

  hasTopLevelNode(id) {
    for (let i = 0; i < this.topLevelNodes.length; i++) {
      if (this.topLevelNodes[i].id === id) {
        return true;
      }
    }
    return false;
  }

  removeTopLevel(id) {
    for (let i = 0; i < this.topLevelNodes.length; i++) {
      if (this.topLevelNodes[i].id === id) {
        const nodeToRemove = this.topLevelNodes[i];
        this.topLevelNodes.splice(i, 1);
        return nodeToRemove;
      }
    }
    return null;
  }
}
