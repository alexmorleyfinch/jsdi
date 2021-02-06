# JSDI

**J**ava**S**cript **D**ependancy-**I**njection

If you are not familiar with dependency injection, we recommend you read up on it. We have a small document explaining the basics of DI, but you'd probably be better off learning it from somewhere properly rather than reading our [quick summary](/docs/BASICS_OF_DI.md).

# But why

ES6 introduced `import` and `export`, so Javascript doesn't actually _need_ dependency injection, but it's a good pattern to learn and use. It makes code more testable because you don't have to magically mock `import` statements, you just pass in mocked objects.

We are not saying you _should_ use DI for javascript, just that it's possible. In some cases it's very valuable. You probably don't need to use it for your website or web application, but take for instance a HTML5 game. Using DI, you can easily swap out parts of your game and manage global config easily in a way that's incredibly flexible.

# Usage

You can use JSDI with only 3 functions. `container`, `make` and `ref`.

- `container` is used to wrap the root object.
- `make` is used to instanciate classes.
- `ref` is used to reference other parts of the object.

## `container(input: object): object`

First, create some kind of container (global object) using the `container` function:

```js
const MySuperGlobal = container({
  hello: 'world',

  i: {
    can: [{contain: 'anything'}],
  },
});
```

You can access your container using regular JS:

```js
console.log(MySuperGlobal.i); // > {can: [{contain: 'anything'}]}
console.log(MySuperGlobal.i.can[0].contain); // > 'anything'
```

## `make(type: Constructor, args: any[] = []): AbstractPlaceholder`

Then instruct JSDI to make the classes using the `make` function. :

```js
const MySuperGlobal = container({
  myInstance: make(MyClass, ['arg1', 'arg2', {arg3: true}]),

  myInstanceCreator: make(MyFactory, ['factoryArg1']),
});
```

You can access your container using regular JS:

```js
console.log(MySuperGlobal.myInstance); // > MyClass
console.log(MySuperGlobal.myInstanceCreator); // > MyFactory
console.log(MySuperGlobal.myInstanceCreator.createMyClass()); // > MyClass
```

## `ref(name: string): AbstractPlaceholder`

You can then reference other parts of the container using the `ref` function:

```js
const MySuperGlobal = container({
  someGlobalOption: 10,

  myConfig: {
    secretPlatformKey: '<some secret>',
    secretPlayformTimeout: ref('someGlobalOption'),
  },

  myInstance: make(MyClass, ['arg1', ref('myConfig.secretPlatformKey')]),
});
```

You can access your container using regular JS:

```js
console.log(MySuperGlobal.someGlobalOption); // > 10
console.log(MySuperGlobal.myConfig.secretPlatformKey); // > '<some secret>'
console.log(MySuperGlobal.myConfig.secretPlayformTimeout); // > 10
```

## Example usage

This is an example of building a HTML5 game using DI and javascript.

First, create the definition of your app:

```js
// src/builds/example.js

export default container({
  /**
   * Canvas config
   */
  width: window.innerWidth,
  height: window.innerHeight,

  /**
   * Control enum (what controls are possible)
   */
  controls: {
    UP: 'up',
    LEFT: 'left',
    DOWN: 'down',
    RIGHT: 'right',
    SHOOT: 'shoot',
  },

  /**
   * Make a controller instance:
   *
   *   controller.hasActiveInput(controls.UP);
   *
   */
  controller: make(Controller, [
    {
      keys: {
        KeyW: ref('controls.UP'),
        KeyA: ref('controls.LEFT'),
        KeyS: ref('controls.DOWN'),
        KeyD: ref('controls.RIGHT'),

        Space: ref('controls.SHOOT'),
        ClickLeft: ref('controls.SHOOT'),
      },
    },
  ]),

  levels: {
    level1: {/* level definition probably from a json file */},
  }

  /**
   * Make the level factory:
   *
   *   const level = levelFactory.createLevel(levels.level1);
   *
   */
  levelFactory: make(LevelFactory)

  /**
   * Make player controller (accepts controller and controls enum as arguments):
   *
   *   if (playerControls.isShooting()) {
   *     // Perform shoot
   *   }
   *
   */
  player1Controls: make(PlayerControls, [ref('controller'), ref('controls')]),

  /**
   * Make a render factory:
   *
   *   const renderer = rendererFactory.createCanvasRenderer(canvas);
   *
   * Example usage of renderer:
   *
   *   renderer.drawCircle({x: 0, y: 0, radius: 50, fill: 'red'});
   *
   */
  rendererFactory: make(RendererFactory, [ref('width'), ref('height')]),

  /**
   * Make a game factory:
   *
   *   gameFactory.createSinglePlayerGame(level, renderer);
   *
   */
  gameFactory: make(MyGameFactory, [
    {
      controller1: ref('player1Controls'),
    },
  ]),
});
```

Next, import the application container and use it:

```js
// src/main.js
import Container from 'src/builds/example.js';

const canvas = document.getElementById('canvas');

// Create renderer at runtime because it needs `canvas`
const renderer = Container.rendererFactory.createCanvasRenderer(canvas);

// Create level at runtime, because we don't want to instanciate ALL levels at once globally
const level = Container.levelFactory.createLevel(Container.levels.level1);

// No need to pass `controller` into the game here, because it was required by the game factory
const gameLoop = Container.gameFactory.createSinglePlayerGame(level, renderer);

// Start the requestAnimationFrame loop that plays the game
gameLoop.start();
```
