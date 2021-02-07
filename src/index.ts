import {Container} from './Container';
import {MakePlaceholder, RefPlaceholder} from './placeholders';
import {Constructor} from './types';

/**
 * API, used to wrap objects that use `make` or `ref`.
 */
export function container(definition: object): object {
  const cont = new Container(definition);

  cont.replacePlaceholders();

  return cont.getOutput();
}

/**
 * API, used to make a placeholder that defines a constructor that can later be instantiated.
 */
export function make(type: Constructor, args: any[] = []): MakePlaceholder {
  return new MakePlaceholder(type, args);
}

/**
 * API, used to make a placeholder that references another part of an object
 */
export function ref(name: string): RefPlaceholder {
  return new RefPlaceholder(name);
}
