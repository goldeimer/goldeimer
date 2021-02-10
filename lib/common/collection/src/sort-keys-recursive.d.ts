declare module 'sort-keys-recursive' {
    type SortOptions = {
        ignoreArrayAtKeys: number[],
        ignoreObjectAtKeys: string[]
    }

    declare function sort(
        something: unknown[] | object,
        options: SortOptions
    ): unknown[] | object

    declare namespace sort {
        declare function array(arr: unknown[]): unknown[]
        declare function object(arr: object): object
    }

    export = sort
}
