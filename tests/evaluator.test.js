import evaluate from '../src/evaluator';

test('evaluates basic arithmetic', () => {
  const { expression, value } = evaluate(() => 4 + 3);
  expect(expression).toBe('4 + 3');
  expect(value).toBe(7);
});

test('can have no stringified expression', () => {
  const { expression, value } = evaluate(12 + 3);
  expect(expression).toBe(undefined);
  expect(value).toBe(15);
});

test('takes basic variables', () => {
  const age = 28;
  const { expression, value } = evaluate(() => age);
  expect(expression).toBe('age');
  expect(value).toBe(28);
});

test('can have functions in the expression', () => {
  function sayHello() {
    return 'Hello World';
  }

  const { expression, value } = evaluate(() => sayHello());
  expect(expression).toBe('sayHello()');
  expect(value).toBe('Hello World');
});

// TODO: fix: if multiline, don't remove trailing semicolon
// test('expressions can span multiple lines', () => {
//   const { expression, value } = evaluate(() => {
//     const firstName = 'Jane';
//     const lastName = 'Doe';
//     return `Her name is ${firstName} ${lastName}.`;
//   });

//   expect(expression).toBe(
//     `const firstName = 'Jane';
//     const lastName = 'Doe';
//     return \`Her name is \${firstName} \${lastName}.\`;`
//   );
//   expect(value).toBe('Her name is Jane Doe.');
// });

// TODO: this one fails because it doesn't parse out the function name (it's not anonymous anymore)
// NOTE: is this even desired behaviour? it would allow for logging large function expressions defined elsewhere
// test('anonymous functions can come from elsewhere', () => {
//   function myAnonymousFunction() {
//     return true;
//   }

//   const { expression, value } = evaluate(myAnonymousFunction);
//   expect(expression).toBe('true');
//   expect(value).toBe(true);
// });
