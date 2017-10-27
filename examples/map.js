import { $ } from '../src/comp-op';

function map(arr, f) {
  return $[f(x) | x <- arr];
}

console.log(
  map([1, 2, 3, 4, 5], x => x * 10)
)
