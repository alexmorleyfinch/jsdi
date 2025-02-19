"use strict";
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
