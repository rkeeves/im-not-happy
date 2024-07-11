import { isNil } from '../base/common';

const ifPresent = <A>(x: A | null | undefined, f: (_: A) => void) => (isNil(x) ? x : f(x));

export const solve = (s: string) =>
  s
    .split('')
    .reduce(
      (s, c) => {
        switch (c) {
          case '-':
            s[0].pop();
            return s;
          case '<':
            ifPresent(s[0].pop(), (x) => s[1].unshift(x));
            return s;
          case '>':
            ifPresent(s[1].shift(), (y) => s[0].push(y));
            return s;
          default:
            s[0].push(c);
            return s;
        }
      },
      [[], []] as [string[], string[]],
    )
    .flat()
    .join('');
