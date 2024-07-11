export type List<A> = <B>(_: (x: A, xs: List<A>) => B, __: B) => B;

export const empty = <A, B>(_: (x: A, xs: List<A>) => B, y: B) => y;

export const cons =
  <A>(x: A, xs: List<A>) =>
  <B>(f: (_: A, __: List<A>) => B, _: B): B =>
    f(x, xs);

export const fromArray = <A>(xs: A[]): List<A> => xs.reduceRight<List<A>>((ys, x) => cons(x, ys), empty);

export const concat = <A>(x_xs: List<A>, ys: List<A>): List<A> => x_xs((x, xs) => cons(x, concat(xs, ys)), ys);

const reverse_ = <A>(x_xs: List<A>, ys: List<A>): List<A> => x_xs((x, xs) => reverse_(xs, cons(x, ys)), ys);

export const reverse = <A>(x_xs: List<A>) => reverse_<A>(x_xs, empty);

export const foldr =
  <A, B>(f: (x: A, y: B) => B) =>
  (y: B) =>
  (x_xs: List<A>): B =>
    x_xs((x, xs) => f(x, foldr(f)(y)(xs)), y);

export const foldl =
  <A, B>(f: (y: B, x: A) => B) =>
  (y: B) =>
  (x_xs: List<A>): B =>
    x_xs((x, xs) => foldl(f)(f(y, x))(xs), y);

export const fmap =
  <A, B>(f: (x: A) => B) =>
  (x_xs: List<A>): List<B> =>
    foldr((x: A, xs: List<B>) => cons(f(x), xs))(empty)(x_xs);

export const filter =
  <A>(f: (x: A) => boolean) =>
  (x_xs: List<A>): List<A> =>
    x_xs((x, xs) => (f(x) ? cons(x, filter(f)(xs)) : filter(f)(xs)), empty);

export const toArray = <A>(xs: List<A>): A[] => foldr((y: A, ys: A[]) => [y, ...ys])([] as A[])(xs);

export const toString = (xs: List<string>) => foldr<string, string>((x, xs) => x.concat(xs))('')(xs);
