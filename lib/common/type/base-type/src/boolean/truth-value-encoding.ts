export enum TruthValueEncoding {
    Boolean,
    Number,
    NumericString,
    HumanReadablePrimary,
    HumanReadableI18nized
}

export namespace TruthValueEncoding {
    export type Default = TruthValueEncoding.Number

    export type Numeric = (
        | TruthValueEncoding.Number
        | TruthValueEncoding.NumericString
    )

    export type HumanReadable = (
        | TruthValueEncoding.HumanReadablePrimary
        | TruthValueEncoding.HumanReadableI18nized
    )

    export type BooleanLike = (
        | Numeric
        | HumanReadable
    )

    export type Boolish = (
        | TruthValueEncoding.Boolean
        | BooleanLike
    )
}
