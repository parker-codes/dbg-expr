import dbg from '../src/index';

test('logs out to the console', () => {
  console.log = jest.fn();
  dbg(() => 88 * 2);
  expect(console.log).toHaveBeenCalled();
});

test('evaluates inline arithmetic', () => {
  const something = 5 * dbg(() => 7 - 1);
  expect(something).toBe(30);
});

test('works without anonymous function', () => {
  const value = dbg('test123');
  expect(value).toBe('test123');
});
