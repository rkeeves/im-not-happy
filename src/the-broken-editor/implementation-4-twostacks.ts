import { isNil } from '../base/common';
import { pipe } from '../base/fn';

const ifPresent = <A>(x: A | null | undefined, f: (_: A) => void) => (isNil(x) ? x : f(x));

const init = (): { head: string[]; tail: string[] } => ({ head: [], tail: [] });

export const solve = pipe(
  (s: string) => s.split(''),
  (xs) =>
    xs.reduce((s, c) => {
      switch (c) {
        case '-':
          s.head.pop();
          return s;
        case '<':
          ifPresent(s.head.pop(), (x) => s.tail.push(x));
          return s;
        case '>':
          ifPresent(s.tail.pop(), (x) => s.head.push(x));
          return s;
        default:
          s.head.push(c);
          return s;
      }
    }, init()),
  ({ head, tail }) => head.concat(tail.reverse()).join(''),
);
