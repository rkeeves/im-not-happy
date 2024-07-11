import { pipe } from '../base/fn';
import { split } from '../base/string';
import { empty, fromArray, reverse, concat, foldl, List, cons, toString } from '../base/list';
import { getOrElse } from '../base/map';

type Editor<A> = [List<A>, List<A>];

const editor = <A>(ls: List<A>, rs: List<A>): Editor<A> => [ls, rs];

const del = <A>([ls, rs]: Editor<A>): Editor<A> => ls((_, xs) => [xs, rs], [ls, rs]);

const left = <A>([ls, rs]: Editor<A>): Editor<A> => ls((x, xs) => [xs, cons(x, rs)], [ls, rs]);

const right = <A>([ls, rs]: Editor<A>): Editor<A> => rs((x, xs) => [cons(x, ls), xs], [ls, rs]);

const add =
  <A>(x: A) =>
  ([ls, rs]: Editor<A>): Editor<A> => [cons(x, ls), rs];

const toList = <A>([ls, rs]: Editor<A>): List<A> => concat(reverse(ls), rs);

const CHR_TO_OPERATION = new Map([
  ['-', del],
  ['<', left],
  ['>', right],
]);

const chrToOp = (c: string) => getOrElse(c, add(c))(CHR_TO_OPERATION);

export const solve = pipe(
  split(''),
  fromArray,
  foldl((xs: Editor<string>, c: string) => chrToOp(c)(xs))(editor<string>(empty, empty)),
  toList,
  toString,
);
