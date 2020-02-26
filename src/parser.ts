export default function parse(expression: string): string {
  let trimmed = trimSides(expression);
  let replaced = replaceCommonAnnoyances(trimmed);
  return replaced;
}

function trimSides(value: string): string {
  const LEFT_SIDE_VALUES = ['function', '(', ')', '=>', '{', 'return'];
  const RIGHT_SIDE_VALUES = ['}', ';'];

  value = trimLeft(value, LEFT_SIDE_VALUES);
  value = trimRight(value, RIGHT_SIDE_VALUES);
  return value;
}

function replaceCommonAnnoyances(value: string): string {
  value = value.replace('_this', 'this'); // Vue/Nuxt
  return value;
}

function trimLeft(str: string, list: string[]) {
  return list.reduce((str, item) => {
    return str.replace(new RegExp('^[' + item + '\\s]+'), '').trimLeft();
  }, str.trim());
}

function trimRight(str: string, list: string[]) {
  return list.reduce((str, item) => {
    return str.replace(new RegExp('[' + item + '\\s]+$'), '').trimRight();
  }, str.trim());
}
