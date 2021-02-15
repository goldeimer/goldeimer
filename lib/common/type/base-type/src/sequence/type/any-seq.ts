/**
 * **Sequence** `Seq`\
 * Unconstrained Array or Tuple
 *
 * Base type of everything list-like, resolves to any `Array` or tuple.
 *
 * - any contents (value type is `unknown`)
 * - any size
 * - agnostic of mutability
 *
 * {@inheritDoc @goldeimer/doc-snippet!Remarks.RestParam#SuitabilityImplied}
 *
 * @group Seq
 */
 export type AnySeq = unknown[] | readonly unknown[]
