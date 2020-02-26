import { Expression } from './types';
import evaluateDbg from './evaluator';
import formatAndLog from './logger';

export default function dbg(expression: Expression): any {
  const logParts = evaluateDbg(expression);
  formatAndLog(logParts);
  return logParts.value;
}
