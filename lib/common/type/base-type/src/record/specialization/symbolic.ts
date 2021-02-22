export type SymbolRecord<
    T extends unknown = unknown
> = Record<symbol, T>

export type SymRecord<
    T extends unknown = unknown
> = SymbolRecord<T>
