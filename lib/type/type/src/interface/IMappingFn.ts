export interface IMappingFn<InType, OutType> {
    (input: InType): OutType
}

export interface ITransformFn<Type> extends IMappingFn<Type, Type> {}

export interface INumberTransformFn extends ITransformFn<number> {}
export interface IStringTransformFn extends ITransformFn<string> {}
