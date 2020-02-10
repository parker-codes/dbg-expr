// TODO: convert to TS
// TODO: add tests for helper functions
// TODO: create function for generating output
// TODO: redo README
// TODO: make sure that `function` anonymous function can work too!
// TODO: make sure that functions can still log out expression -> dbg(() => someFunction());

type Expression = Function | any;
type NullableString = string | null;

interface LogParts {
  location: NullableString;
  expression?: string;
  value: any;
}

function dbg(expression: Expression): any {
  let value: any;
  let reducedExpression: string;

  const callerLocation = getCallerLocation(getStackTrace());

  if (typeof expression === 'function') {
    value = expression();
    formatAndLog({
      location: callerLocation,
      expression: getReducedExpression(expression.toString()),
      value,
    });
    return value;
  }

  value = expression;
  formatAndLog({
    location: callerLocation,
    value,
  });

  return value;
}

function getReducedExpression(stringifiedExpression: string): string {
  console.log('stringifiedExpression', stringifiedExpression);
  // TODO: trim off anonymous function stuff (also taking care of random spaces and old way of doing it)
  // return stringifiedExpression.trimStart('() => ');
  return stringifiedExpression;
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
  // TODO: can't do this because the user could change the name when importing...
  const traceIndex = 1 + stackTrace.findIndex(line => line.includes('dbg'));
  // console.log('traceIndex', traceIndex);

  if (!traceIndex) return null;

  const stackLine = stackTrace[traceIndex];
  // console.log('stackLine', stackLine);

  const matches = stackTrace[traceIndex].match(/(\/[\w-]+)?(\/[\w-]+[.]js:[\d]+):[\d]+/);

  if (matches === null) return '';

  const directory = matches[1] || '';
  const fileAndLine = matches[2] || '';
  return `${directory}${fileAndLine}`;
}

// location and expression are optional
// [location] expression = value
// [src/main.rs:2] a * 2 = 4
function formatAndLog({ location, expression, value }: LogParts): void {
  const parts: string[] = [];
  if (location !== null) parts.push(location);
  if (expression !== undefined) parts.push(expression);
  parts.push('=');
  parts.push(`${value}`);

  const log = parts.join(' ');

  console.log(log);
}

// examples
dbg(() => 4 + 3);

const something = 5 * dbg(() => 7 - 1);
dbg(() => something);

dbg(4 + 4);

export default dbg;
