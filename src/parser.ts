export default function parse(expression: string): string {
  let value = expression;
  value = trimLeft(value, ['function', '(', ')', '=>', '{', 'return']);
  value = trimRight(value, ['}', ';']);
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

// TODO: use these as tests!

// const x = 10;
// const y = 2;
// const height = 28;
// const width = 5;
// const depth = 100;
// const something = 42;

// const functions = [
//   function () { return x + y; },
//   function   ()   {
//        return height * width * depth;
//   },
//   function() {
//   return 4 + 3;
//   },
//   () => 4 + 1,
//   () => variable * 2 + 1,
//   () => {
//     something + 1;
//   }
// ];

// const parsedFunctions = functions.map(parse);

// console.log(parsedFunctions);
