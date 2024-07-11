export const solve = (s: string): string =>
  s
    .split('')
    .reduce(
      (s, c) => {
        switch (c) {
          case '-':
            if (s.i > 0) s.xs.splice(--s.i, 1);
            return s;
          case '<':
            if (s.i > 0) s.i--;
            return s;
          case '>':
            if (s.i < s.xs.length) s.i++;
            return s;
          default:
            s.xs.splice(s.i++, 0, c);
            return s;
        }
      },
      { xs: [] as string[], i: 0 },
    )
    .xs.join('');
