"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphNode = void 0;
/**
 * Used as a graph node in a graph tree that we can iterate in order.
 */
var GraphNode = /** @class */ (function () {
    function GraphNode(id) {
        this.id = id;
        this.nodes = [];
    }
    GraphNode.prototype.forEachDepthFirst = function (callback) {
        this.nodes.forEach(function (node) {
            node.forEachDepthFirst(callback);
        });
        callback(this);
    };
    GraphNode.prototype.addNode = function (node) {
        this.nodes.push(node);
    };
    GraphNode.prototype.removeNode = function (node) {
        var index = this.nodes.indexOf(node);
        if (index >= 0) {
            this.nodes.splice(index, 1);
        }
    };
    GraphNode.prototype.getNode = function (id) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === id) {
                return this.nodes[i];
            }
        }
        return null;
    };
    GraphNode.prototype.isCircular = function () {
        var deps = this.getAllNodeIds();
        var containsKey = deps.includes(this.id);
        return containsKey || this.nodes.some(function (node) { return node.isCircular(); });
    };
    GraphNode.prototype.getAllNodeIds = function () {
        var nodeIds = this.nodes.map(function (node) { return node.id; });
        this.nodes.forEach(function (node) {
            nodeIds = nodeIds.concat(node.getAllNodeIds());
        });
        return nodeIds;
    };
    return GraphNode;
}());
exports.GraphNode = GraphNode;
