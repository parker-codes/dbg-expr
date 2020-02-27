// export type Expression<T> = () => T;
export type NullableString = string | null;

export type Callback<T> = () => T; // a function with no params
export type Expression<T> = T extends Function ? never : T; // anything that is not a function
export type CallbackOrExpression<T> = Callback<T> | Expression<T>;
export type ResultOfCallbackOrExpression<T> = ReturnType<Callback<T>> | T; // always T

export interface LogParts<T> {
  location: NullableString;
  expression?: string;
  // value: Expression<T>;
  // value: T;
  value: ResultOfCallbackOrExpression<T>;
}
