export type NumberLike = number | BigInt

export type Ratio<
    N extends NumberLike = 1,
    D extends NumberLike = 1
> = {
    readonly num: N
    readonly den: D
}

export const ratio = <
    N extends NumberLike = 1,
    D extends NumberLike = 1
>(num: N, den: D) => ({ num, den }) as Ratio<N, D>

export type Peta = Ratio<1000000000000000, 1>
export type Tera = Ratio<1000000000000, 1>
export type Giga = Ratio<1000000000, 1>
export type Mega = Ratio<1000000, 1>
export type Kilo = Ratio<1000, 1>
export type Hecto = Ratio<100, 1>
export type Deca = Ratio<10, 1>
export type Deci = Ratio<1, 10>
export type Centi = Ratio<1, 100>
export type Milli = Ratio<1, 1000>
export type Micro = Ratio<1, 10000>
export type Nano = Ratio<1, 10000000>
export type Pico = Ratio<1, 10000000000>
export type Femto = Ratio<1, 10000000000000>

export type Dozen = Ratio<1, 12>
