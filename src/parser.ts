export default function parse(expression: string): string {
  let trimmed = trimSides(expression);
  let replaced = replaceCommonAnnoyances(trimmed);
  return replaced;
}

function trimSides(expression: string): string {
  const LEFT_SIDE_VALUES = ['function', '(', ')', '=>', '{', 'return']; // trims left to right
  const RIGHT_SIDE_VALUES = ['}']; // trims right to left

  expression = trimLeft(expression, LEFT_SIDE_VALUES);
  expression = trimRight(expression, RIGHT_SIDE_VALUES);

  // only trim semicolon if it's the only line
  const numberOfLines = expression.split(/\r\n|\r|\n/).length;
  if (numberOfLines === 1) {
    expression = trimRight(expression, [';']);
  }

  return expression;
}

function replaceCommonAnnoyances(expression: string): string {
  expression = expression.replace('_this', 'this'); // Vue/Nuxt
  return expression;
}

function trimLeft(string: string, list: string[]): string {
  return list.reduce((str, item) => {
    return str.replace(new RegExp('^[' + item + '\\s]+'), '').trimLeft();
  }, string.trim());
}

function trimRight(string: string, list: string[]): string {
  return list.reduce((str, item) => {
    return str.replace(new RegExp('[' + item + '\\s]+$'), '').trimRight();
  }, string.trim());
}
