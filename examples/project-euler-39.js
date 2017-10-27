import { $ } from '../src/comp-op';

/* Project Euler #39

If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.

{20,48,52}, {24,45,51}, {30,40,50}

For which value of p ≤ 1000, is the number of solutions maximised?
*/

import { range } from 'lodash';

function isPythagorian(a, b, c) {
  return Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2);
}

function numRightTriangles(n) {
  return $[[a, b, c] |
            a <- range(1, ~~(n / 3)),
            rest <- [n - a],
            b <- range(a, ~~(rest / 2)),
            c <- [rest - b],
            isPythagorian(a, b, c)
          ].length;
}

let max = 0;
let maxN = null;
for (let i = 3; i <= 1000; i++) {
  const num = numRightTriangles(i);
  if (num > max) {
    max = num;
    maxN = i;
  }
}

console.log(maxN);
