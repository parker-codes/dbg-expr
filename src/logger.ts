import { LogParts } from './types';

const COLOR_WHITE = 'color: white;';
const BG_COLOR_GREEN = 'background-color: #95B46A;';
const BG_COLOR_BLUE = 'background-color: #2274A5;';
const BG_COLOR_RED = 'background-color: #D33F49;';

// location and expression are optional
export default function log<T>(logParts: LogParts<T>): void {
  if (isServerSide()) {
    logInNodeTerminal(logParts);
  } else {
    logInBrowserConsole(logParts);
  }
}

function isServerSide(): boolean {
  return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
}

// [location] expression = value  -> [src/main.rs:2] a * 2 = 4
function logInNodeTerminal<T>({ location, expression, value }: LogParts<T>): void {
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

function logInBrowserConsole<T>({ location, expression, value }: LogParts<T>): void {
  // TODO: potentially extract tags into method and spread values into it

  console.group('dbg-expr');

  if (!!location) {
    console.debug('%c Location ', [COLOR_WHITE, BG_COLOR_GREEN].join(''), '   ', location);
  }

  if (!!expression) {
    console.debug('%c Expression ', [COLOR_WHITE, BG_COLOR_BLUE].join(''), ' ', expression);
  }

  console.debug('%c Value ', [COLOR_WHITE, BG_COLOR_RED].join(''), '      ', value);

  console.groupEnd();
}

function logExpression() {}
