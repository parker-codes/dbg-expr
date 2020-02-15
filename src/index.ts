// TODO: add tests for helper functions
// TODO: create function for generating output
// TODO: make sure that functions can still log out expression -> dbg(() => someFunction());

import { Expression, NullableString, LogParts } from './types';
import parse from './parser';

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

function getStackTrace(): string[] {
  let trace: string = '';

  try {
    throw new Error('');
  } catch (error) {
    trace = error.stack || '';
  }

  const stack = trace.split('\n').map(line => line.trim());
  return stack.splice(stack[0] == 'Error' ? 2 : 1);
}

function getCallerLocation(stackTrace: string[]): NullableString {
  const LOCATION = 1;

  if (stackTrace.length < LOCATION + 1) return null;

  const matches = stackTrace[LOCATION].match(/(\/[\w-]+)?(\/[\w-]+[.]js:[\d]+):[\d]+/);

  if (matches === null) return null;

  const directory = matches[1] || '';
  const fileAndLine = matches[2] || '';

  return `${directory}${fileAndLine}`;
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
