# Example usage

This is an example of building a HTML5 game using DI and javascript.

## Define application wiring

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
    level1: {
      /* level definition probably from a json file */
    },
  },

  /**
   * Make the level factory:
   *
   *   const level = levelFactory.createLevel(levels.level1);
   *
   */
  levelFactory: make(LevelFactory),

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

## Run application with runtime information (DOM, Canvas, etc)

Next, import the application container and use it:

```js
// src/main.js
import Container from 'src/builds/example.js'; // This is the wiring we just made above

const canvas = document.getElementById('canvas');

// Create renderer at runtime because it needs `canvas`
const renderer = Container.rendererFactory.createCanvasRenderer(canvas);

// Create level at runtime, because we don't want to instantiate ALL levels at once globally
const level = Container.levelFactory.createLevel(Container.levels.level1);

// No need to pass `controller` into the game here because it was required by the game factory
const gameLoop = Container.gameFactory.createSinglePlayerGame(level, renderer);

// Start the requestAnimationFrame loop that plays the game
gameLoop.start();
```
