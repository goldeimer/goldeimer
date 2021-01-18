export type Constructor<
    Type = {},
    ArgsType = any
> = new (...args: ArgsType[]) => Type
