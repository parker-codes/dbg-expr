// TODO: add tests for helper functions
// TODO: make sure that functions can still log out expression -> dbg(() => someFunction());

import { Expression, LogParts } from './types';
import parse from './parser';
import { getCallerLocation, getStackTrace } from './tracer';

function dbg(expression: Expression): any {
  const logParts = evaluateDbg(expression);
  formatAndLog(logParts);
  return logParts.value;
}

function evaluateDbg(expression: Expression): LogParts {
  if (typeof expression === 'function') {
    return {
      location: getCallerLocation(getStackTrace()),
      expression: parse(expression.toString()),
      value: expression(),
    };
  }

  return {
    location: getCallerLocation(getStackTrace()),
    value: expression,
  };
}

// location and expression are optional
// [location] expression = value
// [src/main.rs:2] a * 2 = 4
function formatAndLog({ location, expression, value }: LogParts): void {
  const parts: string[] = [];
  if (!!location) parts.push(`[${location}]`);
  if (!!expression) {
    parts.push(expression);
    parts.push('=');
  }
  parts.push(`${value}`);

  const log = parts.join(' ');

  console.log(log);
}

// // examples
// dbg(() => 4 + 3);

// const something = 5 * dbg(() => 7 - 1);
// dbg(() => something);

// dbg(4 + 4);

export default dbg;
