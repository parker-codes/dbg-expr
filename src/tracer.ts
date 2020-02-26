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
  const LOCATION = 2;

  if (stackTrace.length < LOCATION + 1) return null;

  let matches = stackTrace[LOCATION].match(fileInfoRegex());
  if (matches === null) return null;

  const directory = matches[1] || '';
  let fileAndLine = matches[2] || '';
  // strip out file query string
  if (fileAndLine !== '' && matches.length >= 5) fileAndLine = fileAndLine.replace(matches[4], '');

  return `${directory}${fileAndLine}`;
}

// examples of what needs to be matched
// (at ./node_modules/vue-loader/lib/index.js?!./pages/index.vue?vue&type=script&lang=js&:40:8)
// ./node_modules/vue-loader/lib/index.js?!./pages/index.vue?vue&type=script&lang=js&:40:8
function fileInfoRegex() {
  return /(\/[\w-]+)?(\/[\w-]+.(js|ts|jsx|tsx|vue|svelte)([\w-?=&]*):[\d]+):[\d]+/;
}
