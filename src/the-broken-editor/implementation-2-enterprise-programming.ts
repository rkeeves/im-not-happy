export class Editor {
  private readonly xs: string[];
  private i: number;

  constructor() {
    this.xs = [];
    this.i = 0;
  }

  typeAll(s: string) {
    s.split('').forEach((c) => this.type(c));
    return this;
  }

  type(s: string) {
    switch (s) {
      case '-':
        return this.del();
      case '<':
        return this.left();
      case '>':
        return this.right();
      default:
        return this.add(s);
    }
  }

  del() {
    if (this.i > 0) this.xs.splice(--this.i, 1);
    return this;
  }

  left() {
    if (this.i > 0) this.i--;
    return this;
  }

  right() {
    if (this.i < this.xs.length) this.i++;
    return this;
  }

  add(c: string) {
    this.xs.splice(this.i++, 0, c);
    return this;
  }

  toString() {
    return this.xs.join('');
  }
}
