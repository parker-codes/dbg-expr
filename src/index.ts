import { Expression, CallbackOrExpression, ResultOfCallbackOrExpression } from './types';
import evaluate from './evaluator';
import log from './logger';

export default function dbg<T>(input: CallbackOrExpression<T>): ResultOfCallbackOrExpression<T> {
  const logParts = evaluate(input);
  log(logParts);
  return logParts.value;
}

// export default function dbg<T>(expression: Expression<T>): ReturnType<Expression<T>> {
//   const logParts = evaluate(expression);
//   log(logParts);
//   return logParts.value;
// }

function test() {
  const value = dbg(() => 4);
  const value2 = dbg(4 as any);
  const value3 = dbg(() => 'blah');
  const value4 = dbg(() => 12 * 3);
  const value5 = dbg('test'); // TODO: figure out why this type is the literal value and fix it!
  // https://stackoverflow.com/a/45225666/6480089
  const value6 = useString(value5); // seems to work out fine..
  const value7 = dbg(123);
}

function useString(value: string): string {
  return value;
}
