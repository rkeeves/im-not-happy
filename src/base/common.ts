export const isNil = <A>(x: A | undefined | null): x is undefined | null => x === null || x === undefined;
