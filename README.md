# JSDI

**J**ava**S**cript **D**ependency-**I**njection

If you are not familiar with dependency injection, we recommend you read up on it. We have a small document explaining the basics of DI, but you'd probably be better off learning it from a legitimate learning resource rather than reading our [quick summary](/docs/BASICS_OF_DI.md).

# But why

ES6 introduced `import` and `export`, so Javascript doesn't actually _need_ dependency injection, but it's a good pattern to learn and use. It makes code more testable because you don't have to magically mock `import` statements, you just pass in mocked objects.

We are not saying you _should_ use DI for javascript, just that it's possible. In some cases it's very valuable. You probably don't need to use it for your website or web application, but take for instance a HTML5 game. Using DI, you can easily swap out parts of your game and manage global config easily in a way that's incredibly flexible.

# Why you probably shouldn't use this

This is **experimental** and hasn't been extensively tested in the wild. The feature set of this library is incomplete, and anything you can achieve with this library, you can also acheive using native JS (See [basics of DI](/docs/BASICS_OF_DI.md#final-thoughts)).

We certainly wouldn't recommend this for any real projects. We're just using it for experimentation. The author may also be slow to respond

# Examples

Click here for an example of [real world usage](/docs/EXAMPLE.md);

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

## `make(type: Constructor, args: any[] = [])`

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

## `ref(name: string)`

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
