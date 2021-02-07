declare module "GraphNode" {
    /**
     * Used as a graph node in a graph tree that we can iterate in order.
     */
    export class GraphNode {
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
}
declare module "types" {
    /**
     * A type for constructors (functional or class constructors)
     */
    export type Constructor<T extends {} = {}> = new (...args: any[]) => T;
}
declare module "placeholders" {
    import { Constructor } from "types";
    /**
     * Used to define a constructor that can be later instantiated.
     */
    export class MakePlaceholder {
        type: Constructor;
        args: any[];
        constructor(type: Constructor, args: any[]);
    }
    /**
     * Used to refer to places in an object.
     */
    export class RefPlaceholder {
        name: string;
        constructor(name: string);
    }
}
declare module "utils" {
    import { Constructor } from "types";
    /**
     * Used to set a deep value in an object given an array of keys.
     */
    export function setIn(start: object, keys: string[], value: any): void;
    /**
     * Used to get a deep value in an object given an array of keys.
     */
    export function getIn(start: object, keys: string[]): {
        [key: string]: any;
    };
    /**
     * Used to recursively search an `object` and yield items that are instances of a constructor `ctor`
     */
    export function recurseObjectForPlaceholder<T>(object: object, ctor: Constructor<T>): IterableIterator<{
        key: string[];
        value: T;
    }>;
    /**
     * Used to recursively yield values from an object. Each yields a `value` and a `key` array
     * that points to where the value came from.
     */
    export function recursiveGenerator(object: any, keys?: string[]): IterableIterator<{
        key: string[];
        value: any;
    }>;
    /**
     * Used to check if any value is a plain object instance
     */
    export function isPlainObject(obj: any): boolean;
}
declare module "Container" {
    /**
     * Used for the main logic of replacing placeholders in an object.
     */
    export class Container {
        private definition;
        private graph;
        constructor(definition: object);
        getOutput(): object;
        replacePlaceholders(): void;
    }
}
declare module "index" {
    import { MakePlaceholder, RefPlaceholder } from "placeholders";
    import { Constructor } from "types";
    /**
     * API, used to wrap objects that use `make` or `ref`.
     */
    export function container(definition: object): object;
    /**
     * API, used to make a placeholder that defines a constructor that can later be instantiated.
     */
    export function make(type: Constructor, args?: any[]): MakePlaceholder;
    /**
     * API, used to make a placeholder that references another part of an object
     */
    export function ref(name: string): RefPlaceholder;
}
