import {Constructor} from './types';

/**
 * Used to define a constructor that can be later instanciated.
 */
export class MakePlaceholder {
  type: Constructor;
  args: any[];

  constructor(type: Constructor, args: any[]) {
    this.type = type;
    this.args = args;
  }
}

/**
 * Used to refer to places in an object.
 */
export class RefPlaceholder {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
