import {Container} from './Container';
import {MakePlaceholder, RefPlaceholder} from './placeholders';
import {Constructor} from './types';

export function container(input: object): object {
  const cont = new Container(input);

  cont.replacePlaceholders();

  return cont.getOutput();
}

export function make(type: Constructor, args: any[] = []): MakePlaceholder {
  return new MakePlaceholder(type, args);
}

export function ref(name: string): RefPlaceholder {
  return new RefPlaceholder(name);
}
