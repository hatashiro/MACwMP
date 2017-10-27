'lang sweet.js';

import { unwrap } from '@sweet-js/helpers' for syntax;

export operator $ prefix 19 = (ctx, right) => {
  const next = ctx.next().value;

  if (next.kind !== 'brackets') {
    throw new Error('invalid usage of array comprehension operator: %');
  }

  const tokens = next.inner.slice(1, -1); // slice: omit [ and ]

  const syntax = {
    returnExpr: #``,
    comprehensions: [],
  };
  let returnProcessed = false;

  const emptyComprehension = () => ({
    type: 'guard', // 'bind' (with <-) or 'guard'
    value: #``,
    binding: null, // if type is 'bind', this will be an identifier
  });

  let currentComprehension;
  let metHyphen = false;

  tokens.forEach(token => {
    if (!returnProcessed) {
      if (unwrap(token).value === '|') {
        returnProcessed = true;
      } else {
        syntax.returnExpr = syntax.returnExpr.push(token);
      }
    } else {
      if (!currentComprehension) {
        currentComprehension = emptyComprehension();
      }

      const lit = unwrap(token).value;

      // use temporary var and reset
      const _metHyphen = metHyphen;
      metHyphen = false;

      if (lit === ',') {
        syntax.comprehensions.push(currentComprehension);
        currentComprehension = null;
        return; // no push
      } if (lit === '-' && _metHyphen) {
        currentComprehension.type = 'bind';
        currentComprehension.binding = currentComprehension.value.pop();
        currentComprehension.value = #``;
        return; // no push
      } else if (lit === '<') {
        metHyphen = true;
      }
      currentComprehension.value = currentComprehension.value.push(token);
    }
  });

  // add last comprehension
  if (!currentComprehension) {
    throw new Error('unexpected end of array comprehension');
  }

  syntax.comprehensions.push(currentComprehension);

  let body = #``;
  syntax.comprehensions.forEach(c => {
    if (c.type === 'guard')
      body = body.concat(#`
if (!(${c.value})) return CArray.reject();
`);
    else if (c.type === 'bind')
      body = body.concat(#`
const ${c.binding} = await CArray.fromArray(${c.value}); if (false) { return }
`);
  });

  return #`
(() => {
  async function comp() {
    ${body}
    return Promise.resolve(${syntax.returnExpr});
  }
  return runMonad(CArray, comp).xs;
}())
`;
};
