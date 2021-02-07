/**
 * Used as a graph node in a graph tree that we can iterate in order.
 */
export declare class GraphNode {
    id: string;
    nodes: GraphNode[];
    constructor(id: string);
    forEachDepthFirst(callback: (node: GraphNode) => void): void;
    addNode(node: GraphNode): void;
    removeNode(node: GraphNode): void;
    getNode(id: string): GraphNode | null;
    isCircular(): boolean;
    getAllNodeIds(): string[];
}
