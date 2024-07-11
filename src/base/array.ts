export const join =
  (k: string) =>
  <A>(s: A[]): string =>
    s.join(k);

export const reverse = <A>(xs: A[]): A[] => [...xs].reverse();

export const concat = <A>(front: A[], back: A[]): A[] => front.concat(back);

export const reduce =
  <A, B>(f: (_: B, __: A) => B, x: B) =>
  (xs: A[]): B =>
    xs.reduce(f, x);
