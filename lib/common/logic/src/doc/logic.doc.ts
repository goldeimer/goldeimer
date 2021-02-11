/**
 * Documentation-only types
 *
 * @todo Johannes - Find a better way than to abuse the type system to
 *                  facilitate the re-use recurring documentation snippets.
 *                  --> Can the `@inheritDoc` tag consume `@label` tags?
 */
export namespace DOC {
    export namespace REMARAKS {
        /**
         * @remarks
         * While, in the case of `Extends`, the underlying parent type,  the
         * `ElseT` type parameter defaults to `false` to facilitate ease of
         * `IsType<T>`-style type production, here, it's default argument is
         * `never`, such that it can beomitted without producing an additional
         * type.
         *
         * @label REMARKS_ELSE_T_NEVER
         * @internal
         */
         export type ELSE_T_NEVER = ''
    } // namespace REMARAKS

    export namespace TYPE_PARAM {

        /**
         * @typeParam T - subject the condtion is evaluated against
         *
         * @label TYPE_PARAM_CONDITION_SUBJECT
         * @internal
         */
        export type CONDITION_SUBJECT<T> = T

        export namespace LOGICAL_OPERAND {
            /**
             * @typeParam A - either the `true` or `false` type, usually the result type of
             *                the evaluation of some inner predicate type
             *
             * @label TYPE_PARAM_LOGICAL_OPERAND_A
             * @internal
             */
            export type A<A> = A

            /**
             * @typeParam B - either the `true` or `false` type, usually the result type of
             *                the evaluation of some inner predicate type
             *
             * @label TYPE_PARAM_LOGICAL_OPERAND_B
             * @internal
             */
            export type B<B> = B

            /**
             * @typeParam T - either the `true` or `false` type, usually the result type of
             *                the evaluation of some inner predicate type
             *
             * @label TYPE_PARAM_LOGICAL_OPERAND
             * @internal
             */
            export type T<T> = T
        } // namespace LOGICAL_OPERAND

        /**
         * {@inheritDoc LOGICAL_OPERAND.A}
         * {@inheritDoc LOGICAL_OPERAND.B}
         *
         * @label TYPE_PARAM_LOGICAL_OPERATION
         * @internal
         */
        export type LOGICAL_OPERATION<A, B> = [A, B]
    } // namespace TYPE_PARAM
} // namespace DOC
