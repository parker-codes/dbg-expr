import dbg from '../src/index';
import evaluateDbg from '../src/evaluator';

test('logs out to the console', () => {
  console.log = jest.fn();
  dbg(() => 88 * 2);
  expect(console.log).toHaveBeenCalled();
});

test('evaluates basic arithmetic', () => {
  const { expression, value } = evaluateDbg(() => 4 + 3);
  expect(expression).toBe('4 + 3');
  expect(value).toBe(7);
});

test('evaluates inline arithmetic', () => {
  const something = 5 * dbg(() => 7 - 1);
  expect(something).toBe(30);
});

test('can have no stringified expression', () => {
  const { expression, value } = evaluateDbg(12 + 3);
  expect(expression).toBe(undefined);
  expect(value).toBe(15);
});

test('takes basic variables', () => {
  const age = 28;
  const { expression, value } = evaluateDbg(() => age);
  expect(expression).toBe('age');
  expect(value).toBe(28);
});

test('can have functions in the expression', () => {
  function sayHello() {
    return 'Hello World';
  }

  const { expression, value } = evaluateDbg(() => sayHello());
  expect(expression).toBe('sayHello()');
  expect(value).toBe('Hello World');
});

// TODO: fix: if multiline, don't remove trailing semicolon
// test('expressions can span multiple lines', () => {
//   const { expression, value } = evaluateDbg(() => {
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

//   const { expression, value } = evaluateDbg(myAnonymousFunction);
//   expect(expression).toBe('true');
//   expect(value).toBe(true);
// });
