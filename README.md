# MACwMP

Monadic array comprehension with meta programming in JS

## What's this?

Implementation of Haskell-like array comprehension, probabily in the most
eccentric way.

``` js
$[x + y | x <- [1, 2, 3], y <- [4, 5, 6], x * y % 2 === 0]
// -> [ 5, 7, 6, 7, 8, 7, 9 ]
```

## How does it work?

1. With [Sweet.js](https://www.sweetjs.org/), define a macro for array
   comprehension operator [`$`](src/comp-op.js).
1. The macro builds array comprehension into async/await syntax.
1. Replace global `Promise` with [`CArray`](src/comp-array.js) (stands for comprehensible array)
    + Async/await is like do expression in Haskell
    + Now it [executes monad comprehension](src/run-monad.js) for array
1. Build async/await syntax into `Promise` chaining
    + Do expression in Haskell can also be transformed into bind chaining
1. Profit!

## Run examples

``` shell
npm run build -- examples/simple.js
node dist/simple.js
```

You can see each build step with each build script.

``` shell
# build macro
./scripts/build-macro.sh examples/simple.js
cat dist/simple.macro.js

# build async/await into Promise chaining with Babel
./scripts/build-babel.sh dist/simple.macro.js
cat dist/simple.babel.js

# concat monad stuff
./scripts/build-monad.sh dist/simple.babel.js
cat dist/simple.js
```

## License

[MIT](LICENSE)
