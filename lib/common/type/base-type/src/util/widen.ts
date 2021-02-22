import type { IfExtensionOf } from '../conditional'

export type WidenTo<
    BaseType,
    T,
    Else = never
> = IfExtensionOf<
    BaseType,
    T,
    BaseType,
    Else
>

export type Widen<
    T,
    Else extends (T | never) = T
> = (
    | WidenTo<boolean, T>
    | WidenTo<number, T>
    | WidenTo<string, T>
    | Else
)
