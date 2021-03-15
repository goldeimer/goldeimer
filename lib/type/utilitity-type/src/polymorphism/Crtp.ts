export interface IHigherKinded<
    Type = unknown,
    Kind = unknown
> {
    readonly __Type__: Type
    readonly __Kind__: Kind
}

class Base<T extends { implementation(): void }> {
    constructor() {}

    interface(this: T) {
        this.implementation()
    }
}

class Derived extends Base<Derived> {
    constructor() {
        super()
    }

    implementation() {
        // do something
    }
}

interface Crtp<T extends CrtpType, CrtpType> {
    underlying(): T
}

class Crtp<T extends CrtpType, CrtpType> {
    underlying(this: T): T {
        return this
    }
}

class Counter<T> extends Crtp<T, T>
{
    counter = 0

    constructor() {
        super()

        this.counter++
    }
}

class Subject extends Counter<Subject>{
    constructor() {
        super()
    }

    method() {
        this.counter
    }
}

const subject = new Subject()

import { Primitive } from 'type-fest'

export type RequiredDeep<Type> = Type extends Primitive
    ? Required<Type>
    : Type extends object
        ? {
            [Key in keyof Type]-?: RequiredDeep<Type[Key]>
        }
        : Type
