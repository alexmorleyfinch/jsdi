import {Constructor} from './types';

export class Make {
  type: Constructor;
  args: any[];

  constructor(type: Constructor, args: any[]) {
    this.type = type;
    this.args = args;
  }
}

export class Ref {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
