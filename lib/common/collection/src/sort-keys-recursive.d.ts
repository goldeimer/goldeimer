declare module 'sort-keys-recursive' {
    declare function sort(input: unknown[] | object): unknown[] | object

    declare namespace sort {
        declare function array(arr: unknown[]): unknown[]
        declare function object(arr: object): object
    }

    export = sort
}
