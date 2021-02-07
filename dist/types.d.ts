/**
 * A type for constructors (functional or class constructors)
 */
export declare type Constructor<T extends {} = {}> = new (...args: any[]) => T;
