export type Unpack<A> = A extends (infer E)[] ? E : A
