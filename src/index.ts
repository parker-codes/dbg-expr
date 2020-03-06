import { CallbackOrExpression, ResultOfCallbackOrExpression } from './types';
import evaluate from './evaluator';
import log from './logger';

export default function dbg<T>(input: CallbackOrExpression<T>): ResultOfCallbackOrExpression<T> {
  const logParts = evaluate(input);
  log(logParts);
  return logParts.value;
}
