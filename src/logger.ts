import { LogParts } from './types';

// location and expression are optional
// [location] expression = value  -> [src/main.rs:2] a * 2 = 4
export default function formatAndLog({ location, expression, value }: LogParts): void {
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
