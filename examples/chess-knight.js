import { $ } from '../src/comp-op';

/* Can knight catch a piece in 3 moves?

FYI: Knight in chess moves like below, the same as 桂馬(Keima) in 将棋(Shogi).

║… … … … …     ║… ♘ … ♘ …
║… … … … …     ║♘ … … … ♘
║… … ♘ … …  →  ║… … . … …
║… … … … …     ║♘ … … … ♘
║… … … … …     ║… ♘ … ♘ …
╚═════════     ╚═════════

*/

function moveKnight([x, y]) {
  return [
    [x + 2, y + 1],
    [x + 1, y + 2],
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 2, y - 1],
    [x + 1, y - 2],
    [x - 2, y - 1],
    [x - 1, y - 2]
  ];
}

function atTheSameCell([x1, y1], [x2, y2]) {
  return x1 === x2 && y1 === y2;
}

function canCatchIn3Move(from, target) {
  return $[cell3 | cell1 <- moveKnight(from),
                   cell2 <- moveKnight(cell1),
                   cell3 <- moveKnight(cell2)]
    .some(cell => atTheSameCell(cell, target));
}

console.log(
  canCatchIn3Move([0, 0], [0, 1])
  // ║… … … … …     ║… … … … …     ║… … … … …     ║… … … … …
  // ║… … … … …     ║… … … … …     ║… … … … …     ║… … … … …
  // ║… … … … …  →  ║… ♘ … … …  →  ║… … … … …  →  ║… … … … …
  // ║… … … … …     ║… … … … …     ║… … … ♘ …     ║… … … … …
  // ║♘ t … … …     ║… t … … …     ║… t … … …     ║… ♘ … … …
  // ╚═════════     ╚═════════     ╚═════════     ╚═════════
)

console.log(
  // we can't
  canCatchIn3Move([0, 0], [0, 2])
)
