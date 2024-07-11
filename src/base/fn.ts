export type Fn<A, B> = (_: A) => B;

export const swap =
  <A, B, C>(f: (_: A, __: B) => C) =>
  (y: B) =>
  (x: A): C =>
    f(x, y);

export const curry =
  <A, B, C>(f: (_: A, __: B) => C) =>
  (x: A) =>
  (y: B): C =>
    f(x, y);

export function pipe<A, B>(ab: (a: A) => B): Fn<A, B>;
export function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): Fn<A, C>;
export function pipe<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): Fn<A, D>;
export function pipe<A, B, C, D, E>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): Fn<A, E>;
export function pipe<A, B, C, D, E, F>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
): Fn<A, F>;
export function pipe(a: unknown, ab?: Function, bc?: Function, cd?: Function, de?: Function, ef?: Function): unknown {
  return (x: unknown) => {
    for (let i = 0; i < arguments.length; i++) {
      x = arguments[i](x);
    }
    return x;
  };
}
