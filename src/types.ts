export type Expression = Function | any;
export type NullableString = string | null;

export interface LogParts {
  location: NullableString;
  expression?: string;
  value: any;
}
