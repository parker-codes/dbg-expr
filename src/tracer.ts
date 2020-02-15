import { NullableString } from './types';

export function getStackTrace(): string[] {
  let trace: string = '';

  try {
    throw new Error('');
  } catch (error) {
    trace = error.stack || '';
  }

  const stack = trace.split('\n').map(line => line.trim());
  return stack.splice(stack[0] == 'Error' ? 2 : 1);
}

export function getCallerLocation(stackTrace: string[]): NullableString {
  //   console.log(stackTrace);

  const LOCATION = 1;

  if (stackTrace.length < LOCATION + 1) return null;

  const matches = stackTrace[LOCATION].match(/(\/[\w-]+)?(\/[\w-]+[.]js:[\d]+):[\d]+/);

  if (matches === null) return null;

  const directory = matches[1] || '';
  const fileAndLine = matches[2] || '';

  return `${directory}${fileAndLine}`;
}
