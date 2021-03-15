export type Constructor<
    Type,
    Argument
> = (
    new (...args: Argument[]) => Type
)

export interface IConstructible<
    Type,
    Argument
> {
    new (...args: Argument[]): Type
}

export interface IFactoryFn<
    Type,
    Argument
> {
    (...args: Argument[]): Type
}
