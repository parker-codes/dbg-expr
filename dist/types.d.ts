export declare type Expression = Function | any;
export declare type NullableString = string | null;
export interface LogParts {
    location: NullableString;
    expression?: string;
    value: any;
}
