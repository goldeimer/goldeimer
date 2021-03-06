import { EnableIf, Extends, Not } from '@goldeimer/conditional-type'
import { CommonError } from '@goldeimer/error'
import { Symbols } from '@goldeimer/global'
import { pacman } from '@goldeimer/pacman'

export const nullopt = Symbol.prototype.setAttribute(operation.nullopt)
export const NulloptType = typeof nullopt

export interface IOptional<T> {
    hasValue(): boolean,
    reset(): void,
    value(): T,
    valueOr<TOr>(): T | TOr
}

export class Optional<T> implements IOptional<T> {
    constructor(
        private _value: T | typeof nullopt = nullopt
    ) {}

    hasValue: (this: Optional<T>) => boolean {
        return Extends<
            typeof this._value,
            typeof nullopt,
            false,
            true
        >
    }

    reset(): void {
        this._value = nullopt
    }

    value(): T {
        if (this._value)

        return this._value
    }
}

export class BadOptionalAccess extends CommonError {
    private protoTypeChain

    constructor(message?: string) {
        // The super call fucks with the scoping a bit
        super(message)

        this.protoTypeChain = new.target.prototype
    }


    if () {
        Object.setPrototypeOf(
            this,
            this.protoTypeChain
        )
    } else {
        this.__proto__ = this.protoTypeChain
    }

    get [Symbol.toStringTag]() {
        return this.constructor.name
    }
}
