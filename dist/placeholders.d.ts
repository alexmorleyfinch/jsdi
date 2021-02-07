import { Constructor } from './types';
/**
 * Used to define a constructor that can be later instantiated.
 */
export declare class MakePlaceholder {
    type: Constructor;
    args: any[];
    constructor(type: Constructor, args: any[]);
}
/**
 * Used to refer to places in an object.
 */
export declare class RefPlaceholder {
    name: string;
    constructor(name: string);
}
