export type NullableString = string | null;

export type Callback<T> = () => T; // a function with no params
export interface AnonymousFunction {
  ();
}
export type Expression<T> = T extends AnonymousFunction ? never : T; // anything that is not a function
export type CallbackOrExpression<T> = Callback<T> | Expression<T>;
// export type ResultOfCallbackOrExpression<T> = T; // always T

export type ResultOfCallbackOrExpression<T> = T extends AnonymousFunction ? ReturnType<T> : T extends Function ? never : Expression<T>;

// export type Callback<T> = T extends AnonymousFunction ? () => T : never; // a function with no params
// export type Expression<T> = T extends AnonymousFunction ? never : T; // anything that is not a function
// export type Expression<T> = T extends AnonymousFunction<T> ? never : T; // anything that is not a function

// export type CallbackOrExpression<T> = T extends Callback<T> ? Callback<T> : Expression<T>;
// export type CallbackOrExpression<T> = T extends AnonymousFunction<T> ? AnonymousFunction<T> : Expression<T>;
// export type CallbackOrExpression<T> = T extends AnonymousFunction ? Callback<T> : Expression<T>;
// export type CallbackOrExpression<T> = AnonymousFunction<T> | Expression<T>;

// export type ResultOfCallbackOrExpression<T> = ReturnType<Callback<T>> | Expression<T>; // always T
// export type ResultOfCallbackOrExpression<T> = T extends AnonymousFunction ? ReturnType<Callback<T>> : Expression<T>; // always T
// export type ResultOfCallbackOrExpression<T> = T extends AnonymousFunction<T> ? ReturnType<AnonymousFunction<T>> : Expression<T>; // always T

export interface LogParts<T> {
  location: NullableString;
  expression?: string;
  value: ResultOfCallbackOrExpression<T>;
}
