import { Expression, CallbackOrExpression, LogParts, Callback, ResultOfCallbackOrExpression } from './types';
import parse from './parser';
import trace from './tracer';

export default function evaluate<T>(input: CallbackOrExpression<T>): LogParts<T> {
  if (typeof input === 'function') {
    const callback = input as Callback<T>; // coerce into Callback -> there may be a cleaner way
    return {
      location: trace(),
      expression: parse(callback.toString()),
      value: callback(),
    };
  }

  const expression = input as Expression<T>; // coerce into Expression -> there may be a cleaner way
  return {
    location: trace(),
    value: expression,
  };
}

// export default function evaluate<T>(expression: Expression<T>): LogParts<T> {
//   if (typeof expression === 'function') {
//     return {
//       location: trace(),
//       expression: parse(expression.toString()),
//       value: expression(),
//     };
//   }

//   return {
//     location: trace(),
//     value: expression,
//   };
// }

function test() {
  const { value } = evaluate(() => 5);
  const { value: value2 } = evaluate(() => 'something');
}
