/**
 * A type for constructors (functional or class constructors)
 */
export type Constructor<T extends {} = {}> = new (...args: any[]) => T;
