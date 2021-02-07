# JSDI

**J**ava**S**cript **D**ependency-**I**njection

If you are not familiar with dependency injection, we recommend you read up on it. We have a small document explaining the basics of DI, but you'd probably be better off learning it from a legitimate learning resource rather than reading our [quick summary](/docs/BASICS_OF_DI.md).

# But why

ES6 introduced `import` and `export`, so Javascript doesn't actually _need_ dependency injection, but it's a good pattern to learn and use. It makes code more testable because you don't have to magically mock `import` statements, you just pass in mocked objects.

We are not saying you _should_ use DI for javascript, just that it's possible. In some cases it's very valuable. You probably don't need to use it for your website or web application, but take for instance a HTML5 game. Using DI, you can easily swap out parts of your game and manage global config easily in a way that's incredibly flexible.

# Why you probably shouldn't use this

> This is **experimental** and hasn't been extensively tested in the wild.
> The feature set of this library is incomplete. See [basics of DI](/docs/BASICS_OF_DI.md#final-thoughts)).
> There is currently only one author that may also be slow to respond to issues and pull requests.

We certainly wouldn't recommend this for any real projects. We're just using it for experimentation.

# Usage

You can use JSDI with only 3 functions. `container`, `make` and `ref`. Click here to see [the API](/docs/API.md).

- `container` is used to wrap the object.
- `make` is used to instantiate classes.
- `ref` is used to reference parts of the object.

Create a file like this describing your app (you can create multiple of these for multiple environments):

```js
// src/builds/build-number-1.js

import MyClass from './MyClass';
import MyFactory from './MyFactory';

export default container({
  config: {
    ENV: '<some environment>'
    SOME_SECRET: '<secret>',
  },

  myClass: make(MyClass, [
    ref('config.SOME_SECRET')
    {
      some: {
        additional: 'config',
        specific: ['to', 'this', 'class']
      }
    }
  ]),

  myFactory: make(MyFactory, [
    ref('config.SOME_SECRET'),
    ref('myClass'),
  ])
})
```

Then use it where ever you need to bootstrap the app:

```js
// import build number 1
import MyApp from 'src/builds/build-number-1';

// bootstrap application
const root = document.getElementById('root');
MyApp.myClass.initialise(root);
```

Click here for a [real world example](/docs/EXAMPLE.md)
