import { Constructor } from './types';
/**
 * Used to set a deep value in an object given an array of keys.
 */
export declare function setIn(start: object, keys: string[], value: any): void;
/**
 * Used to get a deep value in an object given an array of keys.
 */
export declare function getIn(start: object, keys: string[]): {
    [key: string]: any;
};
/**
 * Used to recursively search an `object` and yield items that are instances of a constructor `ctor`
 */
export declare function recurseObjectForPlaceholder<T>(object: object, ctor: Constructor<T>): IterableIterator<{
    key: string[];
    value: T;
}>;
/**
 * Used to recursively yield values from an object. Each yields a `value` and a `key` array
 * that points to where the value came from.
 */
export declare function recursiveGenerator(object: any, keys?: string[]): IterableIterator<{
    key: string[];
    value: any;
}>;
/**
 * Used to check if any value is a plain object instance
 */
export declare function isPlainObject(obj: any): boolean;
