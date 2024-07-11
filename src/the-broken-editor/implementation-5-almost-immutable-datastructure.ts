import { isNil } from '../base/common';
import { pipe } from '../base/fn';
import { split } from '../base/string';
import { join, reduce, reverse, concat } from '../base/array';
import { getOrElse } from '../base/map';

type Editor<A> = [A[], A[]];

const editor = <A>(ls: A[], rs: A[]): Editor<A> => [ls, rs];

const del = <A>([[_, ...ls], rs]: Editor<A>): Editor<A> => [ls, rs];

const left = <A>([[x, ...ls], xs]: Editor<A>): Editor<A> => [ls, isNil(x) ? xs : [x, ...xs]];

const right = <A>([xs, [x, ...rs]]: Editor<A>): Editor<A> => [isNil(x) ? xs : [x, ...xs], rs];

const add =
  <A>(x: A) =>
  ([ls, rs]: Editor<A>): Editor<A> => [[x, ...ls], rs];

const toArr = <A>([ls, rs]: Editor<A>) => concat(reverse(ls), rs);

const CHR_TO_OPERATION = new Map([
  ['-', del],
  ['<', left],
  ['>', right],
]);

const chrToOp = (c: string) => getOrElse(c, add(c))(CHR_TO_OPERATION);

export const solve = pipe(
  split(''),
  reduce((e, chr) => chrToOp(chr)(e), editor<string>([], [])),
  toArr,
  join(''),
);
