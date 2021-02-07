var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
define("GraphNode", ["require", "exports"], function (require, exports) {
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
});
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("placeholders", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RefPlaceholder = exports.MakePlaceholder = void 0;
    /**
     * Used to define a constructor that can be later instantiated.
     */
    var MakePlaceholder = /** @class */ (function () {
        function MakePlaceholder(type, args) {
            this.type = type;
            this.args = args;
        }
        return MakePlaceholder;
    }());
    exports.MakePlaceholder = MakePlaceholder;
    /**
     * Used to refer to places in an object.
     */
    var RefPlaceholder = /** @class */ (function () {
        function RefPlaceholder(name) {
            this.name = name;
        }
        return RefPlaceholder;
    }());
    exports.RefPlaceholder = RefPlaceholder;
});
define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPlainObject = exports.recursiveGenerator = exports.recurseObjectForPlaceholder = exports.getIn = exports.setIn = void 0;
    /**
     * Used to set a deep value in an object given an array of keys.
     */
    function setIn(start, keys, value) {
        var theRef = start;
        var lastKey = keys.pop();
        keys.forEach(function (key) {
            theRef = theRef[key];
        });
        if (typeof lastKey === 'string') {
            theRef[lastKey] = value;
        }
    }
    exports.setIn = setIn;
    /**
     * Used to get a deep value in an object given an array of keys.
     */
    function getIn(start, keys) {
        var theRef = start;
        keys.forEach(function (key) {
            theRef = theRef[key];
        });
        return theRef;
    }
    exports.getIn = getIn;
    /**
     * Used to recursively search an `object` and yield items that are instances of a constructor `ctor`
     */
    function recurseObjectForPlaceholder(object, ctor) {
        var _a, _b, _c, key, value, e_1_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 5, 6, 7]);
                    _a = __values(recursiveGenerator(object)), _b = _a.next();
                    _e.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 4];
                    _c = _b.value, key = _c.key, value = _c.value;
                    if (!(value instanceof ctor)) return [3 /*break*/, 3];
                    return [4 /*yield*/, { key: key, value: value }];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }
    exports.recurseObjectForPlaceholder = recurseObjectForPlaceholder;
    /**
     * Used to recursively yield values from an object. Each yields a `value` and a `key` array
     * that points to where the value came from.
     */
    function recursiveGenerator(object, keys) {
        var i, key, _a, _b, _i, name_1, key;
        if (keys === void 0) { keys = []; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!Array.isArray(object)) return [3 /*break*/, 5];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < object.length)) return [3 /*break*/, 4];
                    key = __spread(keys, [i.toString()]);
                    return [5 /*yield**/, __values(recursiveGenerator(object[i], key))];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 12];
                case 5:
                    if (!isPlainObject(object)) return [3 /*break*/, 10];
                    _a = [];
                    for (_b in object)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 6;
                case 6:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    name_1 = _a[_i];
                    key = __spread(keys, [name_1]);
                    return [5 /*yield**/, __values(recursiveGenerator(object[name_1], key))];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, { key: keys, value: object }];
                case 11:
                    _c.sent();
                    _c.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    }
    exports.recursiveGenerator = recursiveGenerator;
    /**
     * Used to check if any value is a plain object instance
     */
    function isPlainObject(obj) {
        if (typeof obj !== 'object' || obj === null)
            return false;
        var proto = Object.getPrototypeOf(obj);
        return proto === null || proto === Object.prototype;
    }
    exports.isPlainObject = isPlainObject;
});
define("Container", ["require", "exports", "GraphNode", "placeholders", "utils"], function (require, exports, GraphNode_1, placeholders_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Container = void 0;
    /**
     * Used for the main logic of replacing placeholders in an object.
     */
    var Container = /** @class */ (function () {
        function Container(definition) {
            var e_2, _a, e_3, _b, e_4, _c;
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
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                // search for MakePlaceholders in the definition and add them to the dependency graph
                for (var _f = __values(utils_1.recurseObjectForPlaceholder(definition, placeholders_1.MakePlaceholder)), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var nextMake = _g.value;
                    var node = new GraphNode_1.GraphNode(nextMake.key.join('.'));
                    try {
                        // there could be RefPlaceholders inside the class constructor arg list that we must add to the dependency graph
                        for (var _h = (e_4 = void 0, __values(utils_1.recurseObjectForPlaceholder(nextMake.value.args, placeholders_1.RefPlaceholder))), _j = _h.next(); !_j.done; _j = _h.next()) {
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
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    this.graph.addNode(node);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_3) throw e_3.error; }
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
                var e_5, _a, _b;
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
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_5) throw e_5.error; }
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
});
define("index", ["require", "exports", "Container", "placeholders"], function (require, exports, Container_1, placeholders_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ref = exports.make = exports.container = void 0;
    /**
     * API, used to wrap objects that use `make` or `ref`.
     */
    function container(definition) {
        var cont = new Container_1.Container(definition);
        cont.replacePlaceholders();
        return cont.getOutput();
    }
    exports.container = container;
    /**
     * API, used to make a placeholder that defines a constructor that can later be instantiated.
     */
    function make(type, args) {
        if (args === void 0) { args = []; }
        return new placeholders_2.MakePlaceholder(type, args);
    }
    exports.make = make;
    /**
     * API, used to make a placeholder that references another part of an object
     */
    function ref(name) {
        return new placeholders_2.RefPlaceholder(name);
    }
    exports.ref = ref;
});
