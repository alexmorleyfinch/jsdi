# API

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

## `make(type: Constructor, args: any[] = []): MakePlaceholder`

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

## `ref(name: string): RefPlaceholder`

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
