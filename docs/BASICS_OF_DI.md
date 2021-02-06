# Basics of dependancy injection

There are plenty of resources on DI, much better than here, but here is a quick summary. The idea of dependancy injection is the inject all dependancies via class constructors. That means no `import` at the top of a file. There are exceptions depending on how far you want to take it. For example, you can import core primitives like a Vector classes etc, but anything beyond a core primitive needs injecting.

For example, normally we'd have a way to log stuff, and we'd import it like:

```js
import Logger from './logger';

export default MyClass {
  doStuff() {
    Logger.log('Hello world');
  }
}
```

This is pretty standard for JS these days, and there is nothing wrong with it. However, what if you wanted to change the value of `Logger` at runtime? Or what if you wanted 2 sets of loggers and switch between the two sets depending on some condition? You'd struggle... Yeah you could hack it in... You could have `logger.js` export 2 different things depending on the environment or something. OR, you could use DI, which gives you more flexibility.

For example:

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

Kinda obvious right, but you might just say "surely we're just pushing the problem up one level" and you are correct. Now every time we want MyClass, we have to pass in a logger, which honestly sucks. This is why we create "factory" classes.

For example, rather than doing `new MyClass(logger)` every time you want a new instance, you can do `myClassFactory.newMyClass()`. Then all you do is pass the logger into the factory instead.

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

So now all we've done is "push the problem up one level further" you might say. Well... Now, myClassFactory can be a global, and its well defined ahead of time that MyClassFactory needs a logger. Its there in the code, obvious. What if you wanna change the logger for production? Just pass in a new logger instance. What if you wanna change how the logger behaves in unit tests? Just pass in a mocked instance.

This is the true power of DI. Ultimate configuration of your entire application in one place.

So how does this tie with our API? Well. Continuing with the above example, we now have a global `myClassFactory` that we wanna use every time we wanna instanciate a new MyClass. So we basically have some global state.

We could do:

```js
// here are all our classes
class Logger {
  /* ... */
}

class MyClassFactory {
  /* ... */
}

class Application {
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
  myClassFactory: new MyClassFactory(this.logger),
  myApplication: new Application(this.myClassFactory),
};

// here we run the application
GlobalAppState.myApplication.run();
```

If we were in a testing environment, we could keep everything exactly the same, but change `GlobalAppState`, E.G:

```js
// here we bootstrap the entire application for unit testing.
const GlobalAppState = {
  logger: new MockedLogger(), // note this is a MOCKED logger
  myClassFactory: new MyClassFactory(this.logger),
  myApplication: new Application(this.myClassFactory),
};
```

So you can see, just by changing how we bootstrap the application, changes how the entire thing functions! DI ftw.
