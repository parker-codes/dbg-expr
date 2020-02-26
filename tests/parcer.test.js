import parse from '../src/parser';

test('parses basic one-liner function', () => {
  const expression = parse('function () { return x + y; }');
  expect(expression).toBe('x + y');
});

// TODO: fails because semicolon and closing bracket exist
test('parses basic multi-line function', () => {
  const expression = parse(`
  function () {
    return height * width * depth;
  }
  `);
  expect(expression).toBe('height * width * depth');
});

// TODO: fails because semicolon and closing bracket exist
test('parses multi-line function regardless of spacing', () => {
  const expression = parse(`
  function  ()   {

       return 1+ 1;
    }
  `);
  expect(expression).toBe('1+ 1');
});

test('parses basic arrow function', () => {
  const expression = parse('() => 4 - 1');
  expect(expression).toBe('4 - 1');
});

test('parses arrow function with variable', () => {
  const expression = parse('() => variable * 2 + 1');
  expect(expression).toBe('variable * 2 + 1');
});

test('parses multi-line arrow function with variable', () => {
  const expression = parse(`
    () => {
      something + 1;
    }
  `);
  expect(expression).toBe('something + 1');
});

// TODO: add tests for multi-line output, like
// () => {
//   const first = 1;
//   const second = 2;
//   return first + second;
// }
