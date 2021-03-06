import { ReturnAny } from "./Function"

export interface IHigherKinded<
    Type = unknown,
    Kind = unknown
> {
    private readonly readonly __Type__: Type
    private readonly readonly __Kind__: Kind
}

export interface ICompositeType implements IHigherKinded {}

export interface IFactoryFn<ArgsType, ReturnType_> {
    (...args: ArgsType[]): ReturnType_
}

export type FactoryFn<Fn extends ReturnAny> = IFactoryFn<Parameters<Fn>, ReturnType<Fn>>
    ...args: never[]
):  | never

export namespace Skills {
    export interface Callable {}
}



const createTypeParameter = <FactoryFn = Symbol>(
    context: string = 'goldeimer'
) => (context)

export interface ITypeParameter<Parameter> {
    private readonly __parameter__: Parameter
}

export class TypeParameter<FactoryFn> implements ITypeParameter<ReturnType<FactoryFn>> {
    private readonly __parameter__ = FactoryFn()
}}

const HasTypeParameter<Type> =

export class TypeProperty<Type> {
    private readonly __type__: Type
}

export interface IParametrize<Type> extends TypeProperty<Type>, TypeParameter {}

const a = parametrized(2)
const b = parametrized(3)
const c = typeof a === typeof b
const d = typeof c

interface CRTP<
    Base,
    Derived extends Base
> {

}

type IsNamed<Type> = Type extends INamedType<infer NamedType> ? NamedType : never

const makeNamed = <T>(t: T): INamedType<T> => t

type TypeName<Type> = Type & { __typename__: Type }

const named = (n: number) => INamedType<n>

export class TypeOf<T extends > {
    readonly __type__: T
    __typename__: ReturnType<test>

    test() {
        return typeof this.__type__
    }
}

export type TypeOfT<T

export class Crtp<Base, Derived> {
    t: TypeOf<Derived>
}

export interface Extends<TypeA, TypeB> extends IHigherKinded<TypeA, TypeB> {

}

export interface IsParametrizedBy<
    TypeA,
    TypeB
> {

}

interface ICRTP <D, B> extends HKT_121<D, B> {
    impl: () =>  {}
}

type Crtp<B, D> = Extends<D, B>
