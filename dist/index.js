"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ref = exports.make = exports.container = void 0;
var Container_1 = require("./Container");
var placeholders_1 = require("./placeholders");
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
    return new placeholders_1.MakePlaceholder(type, args);
}
exports.make = make;
/**
 * API, used to make a placeholder that references another part of an object
 */
function ref(name) {
    return new placeholders_1.RefPlaceholder(name);
}
exports.ref = ref;
