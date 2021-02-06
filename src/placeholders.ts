import {Constructor} from './types';

export class AbstractPlaceholder {}

export class MakePlaceholder extends AbstractPlaceholder {
  type: Constructor;
  args: any[];

  constructor(type: Constructor, args: any[]) {
    super();

    this.type = type;
    this.args = args;
  }
}

export class RefPlaceholder extends AbstractPlaceholder {
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
