import { expect, describe, test } from '@jest/globals';
import * as IndexBased from './implementation-1-index-based';
import * as Enterprise from './implementation-2-enterprise-programming';
import * as PopPushShiftUnshift from './implementation-3-poppush-shiftunshift';
import * as TwoStacks from './implementation-4-twostacks';
import * as ImmutableDataStructure from './implementation-5-almost-immutable-datastructure';
import * as ChurchEncoded from './implementation-6-immutable-church-encoded-data-structure';

describe('The Broken Editor', () => {
  [
    { name: 'Index-based', implementation: IndexBased.solve },
    {
      name: 'Enterprise programming',
      implementation: (s: string) => new Enterprise.Editor().typeAll(s).toString(),
    },
    { name: 'Pop Push Shift Unshift', implementation: PopPushShiftUnshift.solve },
    { name: 'Two Stacks', implementation: TwoStacks.solve },
    { name: 'Almost Immutable Data Structure', implementation: ImmutableDataStructure.solve },
    { name: 'Immutable Church-encoded Data Structure', implementation: ChurchEncoded.solve },
  ].forEach(({ name, implementation: f }) => {
    describe(name, () => {
      test('The example from README', () => {
        expect(f('Helo<l> worxld!<<<-')).toEqual('Hello world!');
      });
      test('No mistakes', () => {
        expect(f('echo "Hello World!";')).toEqual('echo "Hello World!";');
      });
      test('Single mistake', () => {
        expect(f('Midnight takes hear<<<<your >>>>t and your soul')).toEqual('Midnight takes your heart and your soul');
      });
      test('Out of bounds', () => {
        expect(f('<<SELECT * FROM users WHERE age >= 18>>;')).toEqual('SELECT * FROM users WHERE age = 18;');
      });
      test('Out of bounds 2', () => {
        expect(f('<1>> >2<3->>>3< ')).toEqual('1 2 3');
      });
      test('Backspace', () => {
        expect(f('print $_=~/[0-9a-z]/i;')).toEqual('print $_=~/[9z]/i;');
      });
      test('007', () => {
        expect(f('.<on<<"B>>d> me<<Ja>>>ss- on<<B>>>d." 7<00<<- ')).toEqual('"Bond. James Bond." 007');
      });
    });
  });
});
