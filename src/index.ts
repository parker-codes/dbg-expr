import { Expression, LogParts } from './types';
import parse from './parser';
import { getCallerLocation, getStackTrace } from './tracer';
import formatAndLog from './logger';

export default function dbg(expression: Expression): any {
  const logParts = evaluateDbg(expression);
  formatAndLog(logParts);
  return logParts.value;
}

export function evaluateDbg(expression: Expression): LogParts {
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
