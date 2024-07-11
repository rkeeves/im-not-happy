export const getOrElse =
  <A, B>(k: A, x: B) =>
  (m: Map<A, B>): B =>
    m.has(k) ? (m.get(k) as B) : x;
