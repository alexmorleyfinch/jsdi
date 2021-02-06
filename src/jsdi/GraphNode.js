export default class GraphNode {
  constructor(id) {
    this.id = id;
    this.nodes = [];
  }

  forEachDepthFirst(callback) {
    this.nodes.forEach((node) => {
      node.forEachDepthFirst(callback);
    });
    callback(this);
  }

  addNode(node) {
    this.nodes.push(node);
  }

  getAllDependencies() {
    let blah = this.getDirectDependencies();
    this.nodes.forEach((node) => {
      blah = blah.concat(node.getAllDependencies());
    });
    return blah;
  }

  getDirectDependencies() {
    return this.nodes.map((node) => node.id);
  }

  isCircular() {
    const deps = this.getAllDependencies();
    const containsKey = deps.includes(this.id);

    return containsKey || this.nodes.some((node) => node.isCircular());
  }
}
