# The Broken Editor

See original problem statement [here](https://www.codingame.com/ide/puzzle/the-broken-editor).

## TLDR

You know the blinking cursor thingy from text editors: `Where is that cur|sor in this sentence?`

You'll be given a string which contains commands to add/delete a char and move around the cursor.

Your task is to implement an algorithm which can generate the resulting string given that sequence of commands.

## Storymode

You are given a sequence of key presses like `Helo<l> worxld!<<<-`, and you should write a text editor function which turns it into `Hello world!`.

How? Well think of the sequence of key presses like:
- `<` move cursor left
- `>` move cursor right
- `-` delete character left of cursor
- for any other character c write c on the left side of the cursor.

Our example `Helo<l> worxld!<<<-` step-by-step:

```
      |
'H'   H|
'e'   He|
'l'   Hel|
'o'   Helo|
'<'   Hel|o
'l'   Hell|o
'>'   Hello|
' '   Hello |
'w'   Hello w|
'o'   Hello wo|
'r'   Hello wor|
'x'   Hello worx|
'l'   Hello worxl|
'd'   Hello worxld|
'!'   Hello worxld!|
'<'   Hello worxld|!
'<'   Hello worxl|d!
'<'   Hello worx|ld!
'-'   Hello wor|ld!
```

The `-` / `<` / `>` commands are not guaranteed to remain in bounds. In case of out of bounds, ignore the problematic command:

```
      |
'X'   X|
'-'   |
'-'   |   // This '-' (delete) would've resulted in out of bounds, so ignore it
'Y'   Y|
'Y'   YY|
'Y'   YYY|
'>'   YYY| // This '>' (move right) would've resulted in out of bounds, so ignore it
```

## Solution 1 - Mutable Index-based

We write the solution into one big string, and represent the cursor as a number.

I think this is a noob trap.

It might look efficient at first glance because there's a lot of index juggling which seems to be cool or something.

In reality we grow and shrink the underlying data structure at arbitrary positions, so if this was a real programming language and a real array it would just result in a lot of unnecessary copying.

## Solution 2 - Enterprise programming

Same stuff, but instead in an enterprise-level programming mode.

It is just oop clutter.

## Solution 3 - Mutable Pop Push Shift Unshift

We use two 'lists'. We pop/push the back of one, while we shift/unshift from the front of the other one.

We no longer arbitrarily mutate the underlying data-structures.

Messing around with the front is still a bit problematic if this was a real array.

## Solution 4 - Mutable Two Stacks

We use two stacks. Push/pop. As a side effect of this, one of them will contain the elements in reverse order.

So when we join the two stacks together at the end we'll have to reverse one of them.

## Solution 5 - Almost Immutable Data Structure

We use essentially two 'almost immutable' singly linked lists, and we encapsulate them into their own `Editor` datastructure.

I say 'almost immutable' because at the end of the day these are just JS arrays and you could potentially mutate them.

## Solution 6 - Immutable Church Encoded Data Structure

I lied. Solution 3 is almost immutable. It uses JS arrays and there's no guarantee for immutability.

In this solution we use singly linked lists instead of JS Arrays.

These are as immutable as it gets.

If you take a look into `~/src/base/list.ts` you'll see that we are using Church-encoding to encode the two possible constructors `nil` and `cons` as pure functions.

Aka we don't 'store' the data anywhere... we 'store' the elements in lexical scope.

There's a considerable amount of recursion.

This Church encoding also hogs memory etc.

But it is as immutable as it gets.

## Your solution?

Can you make your own solution?
