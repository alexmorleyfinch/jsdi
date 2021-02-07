import {Constructor} from './types';

export class MakePlaceholder {
  type: Constructor;
  args: any[];

  constructor(type: Constructor, args: any[]) {
    this.type = type;
    this.args = args;
  }
}

export class RefPlaceholder {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
