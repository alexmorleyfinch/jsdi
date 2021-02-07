import { MakePlaceholder, RefPlaceholder } from './placeholders';
import { Constructor } from './types';
/**
 * API, used to wrap objects that use `make` or `ref`.
 */
export declare function container(definition: object): object;
/**
 * API, used to make a placeholder that defines a constructor that can later be instantiated.
 */
export declare function make(type: Constructor, args?: any[]): MakePlaceholder;
/**
 * API, used to make a placeholder that references another part of an object
 */
export declare function ref(name: string): RefPlaceholder;
