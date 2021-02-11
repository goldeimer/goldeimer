declare module 'walk-back'
{
    /**
     * Walk up the directory tree looking for the closest matching file.
     *
     * @remarks
     * Reexported from {@link walk-back}.
     *
     * @param startAt    path to initial (deepest) directory
     * @param lookingFor filename searched for
     *
     * @returns path to closest matching file
     *          (or `null` in case of no matches at all)
     *
     * @todo Johannes
     *
     * - current interface:
     *   ```
     *       walkBack(
     *           startAt: string,
     *           lookingFor: string
     *       ): string
     *   ```
     *
     * - desired interface:
     *   ```
     *       walkBack(
     *           predicate: string
     *               | <A>(path: PortablePath, ...args: A): boolean
     *           startAt: PortablePath = process.cwd(),
     *           stopAt?: PortablePath
     *       ): MaybeError<PortablePath>
     *   ```
     */
    function walkBack(
        startAt: string,
        lookingFor: string,
    ): string | null

    export = walkBack
}
