"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var GraphNode_1 = require("./GraphNode");
var placeholders_1 = require("./placeholders");
var utils_1 = require("./utils");
/**
 * Used for the main logic of replacing placeholders in an object.
 */
var Container = /** @class */ (function () {
    function Container(definition) {
        var e_1, _a, e_2, _b, e_3, _c;
        // create a clone of the input so we don't accidentally modify it
        this.definition = __assign({}, definition);
        // create a root graph node that we used to build our dependency tree
        this.graph = new GraphNode_1.GraphNode(''); // This is the root graph node so it has no `id`
        try {
            // search for RefPlaceholders in the definition and add them to the dependency graph
            for (var _d = __values(utils_1.recurseObjectForPlaceholder(definition, placeholders_1.RefPlaceholder)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var nextRef = _e.value;
                this.graph.addNode(new GraphNode_1.GraphNode(nextRef.key.join('.')));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            // search for MakePlaceholders in the definition and add them to the dependency graph
            for (var _f = __values(utils_1.recurseObjectForPlaceholder(definition, placeholders_1.MakePlaceholder)), _g = _f.next(); !_g.done; _g = _f.next()) {
                var nextMake = _g.value;
                var node = new GraphNode_1.GraphNode(nextMake.key.join('.'));
                try {
                    // there could be RefPlaceholders inside the class constructor arg list that we must add to the dependency graph
                    for (var _h = (e_3 = void 0, __values(utils_1.recurseObjectForPlaceholder(nextMake.value.args, placeholders_1.RefPlaceholder))), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var nextRef = _j.value;
                        var existingNode = this.graph.getNode(nextRef.value.name);
                        if (existingNode) {
                            this.graph.removeNode(existingNode);
                            node.addNode(existingNode);
                        }
                        else {
                            node.addNode(new GraphNode_1.GraphNode(nextRef.value.name));
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                this.graph.addNode(node);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    Container.prototype.getOutput = function () {
        return this.definition;
    };
    Container.prototype.replacePlaceholders = function () {
        var _this = this;
        // we now have the dependency graph
        if (this.graph.isCircular()) {
            throw new Error('Circular dependencies error');
        }
        // the graph has been verified as not being circular,
        // meaning we can safely build it from the leaf nodes up.
        this.graph.forEachDepthFirst(function (node) {
            var e_4, _a, _b;
            if (!node.id)
                return; // when we buildGraph, the root graph node has `id` of ""
            var defKey = node.id.split('.');
            var value = utils_1.getIn(_this.definition, defKey);
            if (value instanceof placeholders_1.MakePlaceholder) {
                // we can safely make this because it is in order
                var newArgs = __spread(value.args);
                try {
                    for (var _c = __values(utils_1.recurseObjectForPlaceholder(value.args, placeholders_1.RefPlaceholder)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var nextRef = _d.value;
                        var refValue = utils_1.getIn(_this.definition, nextRef.value.name.split('.'));
                        utils_1.setIn(newArgs, nextRef.key, refValue);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                var instance = new ((_b = value.type).bind.apply(_b, __spread([void 0], newArgs)))();
                utils_1.setIn(_this.definition, defKey, instance);
            }
            if (value instanceof placeholders_1.RefPlaceholder) {
                var refValue = utils_1.getIn(_this.definition, value.name.split('.'));
                utils_1.setIn(_this.definition, defKey, refValue);
            }
        });
    };
    return Container;
}());
exports.Container = Container;
