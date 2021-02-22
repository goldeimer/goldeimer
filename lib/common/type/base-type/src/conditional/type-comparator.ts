export type UnaryOperator<_T> = unknown

export interface BinaryOperator<_A, _B> {
    operator(): unknown
}

export type TernaryOperator<_A, _B, _C> = unknown

export type TypeComparator<A, B> = BinaryOperator<A, B>
