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
