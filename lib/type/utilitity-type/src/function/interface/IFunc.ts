export type FuncParams = ArrayLike<unknown>

export interface IFunc<
    FuncParams = unknown[],
    Returns = void
> {
    (...args: FuncParams): Returns
}
