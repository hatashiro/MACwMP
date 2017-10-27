import { $ } from '../src/comp-op';

console.log(
  $[x + y | x <- [1, 2, 3], y <- [4, 5, 6], x * y % 2 === 0]
)
