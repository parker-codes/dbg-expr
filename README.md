<h2 align="center">Debug</h2>

A helper for evalutating and logging an expression at the same time. Idea taken from [Rust dbg! macro](https://doc.rust-lang.org/std/macro.dbg.html).

Instead of separating "working" logic in order to log out individual pieces, use this function to log the expression and value in place!

---

## Features

- display called location (file and line number)
- unevaluated expression
- value of expression result
- returns value so it can be used in place!

---

## Installation

```bash
# yarn
$ yarn add debug

# npm
$ npm install --save debug
```

---

## Usage

Just import the function and call it around an expression, either on its own line or an existing line.

For example:

```js
import debug from 'debug';

// on its own line (like console.log())
debug(() => 4 - 1); // [/src/index.js:16] 4 - 1 = 3

// on an existing line
const value = 8 * debug(() => 1 + 1); // [/src/index.js:44] 1 + 1 = 2

// using named variables
const age = api.getUser().age;
debug(() => age); // [/models/user.js:25] age = 30
```

That last one is easier to type than:

```js
const age = 30;
console.log('age', age);
```

---

## Log Format

`[location] expression = value`

---

## Notice

You'll notice that the expression is wrapped in a function. This is the only way to keep the expression unevaluated and logged out for you! If you pass only the expression, you'll still see the location and value, but not the stringified expression.

Please also note that the examples above are using ES6 arrow functions. You may also use regular anonymous functions with the `function` keyword, like so:

```js
var variable = 98;

// [/src/index.js:8] variable + 1 = 99
debug(function() {
  return variable + 1;
});
```
