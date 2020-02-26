import { Expression, LogParts } from './types';
import parse from './parser';
import { getCallerLocation, getStackTrace } from './tracer';

export default function evaluateDbg(expression: Expression): LogParts {
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
