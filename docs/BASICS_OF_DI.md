# Basics of dependency injection

There are plenty of resources on DI but here is a quick summary. The idea of dependency injection is to inject all dependencies via class constructors. That means no `import` at the top of a file. There are exceptions depending on how far you want to take it. For example, you can import core primitives like a Vector classes etc, but anything beyond a core primitive needs injecting.

For example, normally we'd have a way to log stuff, and we'd import it like:

```js
import Logger from './logger';

export default MyClass {
  doStuff() {
    Logger.log('Hello world');
  }
}
```

This is pretty standard for JS these days, and there is nothing wrong with it. However what if you wanted to change the value of `Logger` at runtime? What if you wanted to switch between 2 sets of loggers depending on some condition? You could hack it in, for example you could have `logger.js` export 2 different loggers depending on the environment or something.

OR, you could use DI which gives you more flexibility. For example:

```js
export default MyClass {
  constructor(logger) {
    this.logger = logger;
  }

  doStuff() {
    this.logger.log('Hello world');
  }
}
```

This is pretty obvious right, but you might just say "surely we're just pushing the problem up one level" and you are correct. Now every time we want MyClass, we have to pass in a logger, which honestly sucks. This is why we create "factory" classes.

For example, rather than doing `new MyClass(logger)` every time you want a new instance, you can do `myClassFactory.newMyClass()`. Then all you do is pass the logger into the factory constructor instead.

```js
class MyClassFactory {
  constructor(logger) {
    this.logger = logger;
  }

  newMyClass() {
    return new MyClass(logger);
  }
}
```

Then your app will look like so:

```js
const myClassFactory = new MyClassFactory(logger); // logger is passed in here
const myClassInstance = myClassFactory.newMyClass(); // and not here
```

Now all we've done is "push the problem up one level further" you might say. Well, now `myClassFactory` can be a global, and it's well defined ahead of time that `MyClassFactory` needs a logger.

- What if you want to change the logger in production? Just pass in a new logger instance.
- What if you want to change how the logger behaves in unit tests? Just pass in a mocked instance.

This is the true power of DI. Ultimate configuration of your entire application in one place, and ultimate visibility of a classes dependencies.

## Now everything is injected and we have factories everywhere, what does my app look like?

Well, continuing with the above example we now have a global `myClassFactory` that we want to use every time we want to instantiate a new `MyClass`.

So we basically have some global state. We could do:

```js
// here are all our classes
class Logger {
  /* ... */
}

class MyClassFactory {
  /* ... */
}

class Application {
  // pass in applications dependancies
  constructor(myClassFactory) {
    this.myClassFactory = myClassFactory;
  }

  run() {
    const myClass = this.myClassFactory.newMyClass();

    myClass.doStuff(); // uses the logger defined before this class is even run
  }
}

// here we bootstrap the entire application.
const GlobalAppState = {
  logger: new Logger(),
  myClassFactory: new MyClassFactory(GlobalAppState.logger),
  myApplication: new Application(GlobalAppState.myClassFactory),
};

// here we run the application
GlobalAppState.myApplication.run();
```

If we were in a testing environment, we could keep everything exactly the same, but change `GlobalAppState`, E.G:

```js
// here we bootstrap the entire application for unit testing.
const GlobalAppState = {
  logger: new MockedLogger(), // note this is a MOCKED logger
  myClassFactory: new MyClassFactory(GlobalAppState.logger),
  myApplication: new Application(GlobalAppState.myClassFactory),
};
```

So you can see, just by changing how we bootstrap the application, changes how the entire thing functions! DI ftw.

This concludes our basic description of Dependency Injection. There are other concepts like auto-wiring and just-in-time instantiation, but those are advanced concepts.

# Converting the above example to our API

```js
// import all classes used in our app
import Logger from './Logger.js';
import MyClassFactory from './MyClassFactory.js';
import Application from './Application.js';

// make global app state
const GlobalAppState = container({
  logger: make(Logger),

  myClassFactory: make(MyClassFactory, [ref('logger')]),

  myApplication: make(Application, [ref('myClassFactory')]),
});

// example usage, use however you want!
GlobalAppState.logger.log('hello');

// can use anything directly (though, should you?)
const myClass = GlobalAppState.myClassFactory.newMyClass();

// run a function on a thing, when ever, where ever and how ever you need
GlobalAppState.myApplication.run();
```

# Final thoughts

Finally, now you might say "why would we use your API over native javascript?" because clearly:

```js
const GlobalAppState = {
  logger: new Logger(),
  myClassFactory: new MyClassFactory(GlobalAppState.logger),
  myApplication: new Application(GlobalAppState.myClassFactory),
};
```

is easier to read than:

```js
const GlobalAppState = container({
  logger: make(Logger),
  myClassFactory: make(MyClassFactory, [ref('logger')]),
  myApplication: make(Application, [ref('myClassFactory')]),
});
```

and you'd be correct. It is easier to read, but it doesn't work.

We can't use `GlobalAppState.logger` because we can't use `GlobalAppState` before it has been defined. We also can't use `this.logger` because `this` refers to the `window` object. So we need some kind of framework to be able to refer to existing parts of state.

Using JSDI allows:

- referencing other parts of the container (using `ref`)
- referencing other parts of the container inside class constructor arguments (using `make`)
- auto wiring [NOT YET IMPLEMENTED]
- just-in-time instantiation [NOT YET IMPLEMENTED]
