import {
    TsConfigJson
} from 'type-fest'

import {
    TypescriptVersion37,
    TypescriptVersion38,
    TypescriptVersion39,
    TypescriptVersion40,
    TypescriptVersion41,
    TypescriptVersion42,
    ValidTypescriptVersions
} from './enum'

export declare namespace TsConfig {
    export namespace CompilerOptions {
        export interface Plugin extends TsConfigJson.CompilerOptions.Plugin {}

        type Jsx = TsConfigJson.CompilerOptions.JSX
        type Lib = TsConfigJson.CompilerOptions.Lib
        type Module = TsConfigJson.CompilerOptions.Module
        type Target = TsConfigJson.CompilerOptions.Target
    }

    export interface CompilerOptions<
        TV extends ValidTypescriptVersions
    > extends TsConfigJson.CompilerOptions{
        /** @default false */
        assumeChangesOnlyAffectDirectDependencies?:
            TV extends TypescriptVersion38 ? boolean : never

        /** @default false */
        disableReferencedProjectLoad?:
            TV extends TypescriptVersion40 ? boolean : never

        /** @default false */
        disableSolutionSearching?:
            TV extends TypescriptVersion38 ? boolean : never

        /** @default false */
        disableSourceOfProjectReferenceRedirect?:
            TV extends TypescriptVersion38 ? boolean : never

        /** @default false */
        extendedDiagnostics?: boolean

        /** @default false */
        importsNotUsedAsValues?:
            TV extends TypescriptVersion38
                ? 'remove' | 'preserve' | 'error'
                : never

        /** @default false */
        noPropertyAccessFromIndexSignature?:
            TV extends TypescriptVersion42 ? boolean : never

        /** @default false */
        noUncheckedIndexedAccess?:
            TV extends TypescriptVersion41 ? boolean : never
    }

    export type FallbackPolling = 'fixedPollingInterval'
                                | 'priorityPollingInterval'
                                | 'dynamicPriorityPolling'
                                | 'synchronousWatchDirectory'

    export type WatchDirectory = 'fixedPollingInterval'
                               | 'dynamicPriorityPolling'
                               | 'useFsEvents'

    export type WatchFile = 'fixedPollingInterval'
                          | 'priorityPollingInterval'
                          | 'dynamicPriorityPolling'
                          | 'useFsEvents'
                          | 'useFsEventsOnParentDirectory'

    export interface CompilerOptions37 extends CompilerOptions<3.7> {}
    export interface CompilerOptions38 extends CompilerOptions<3.8> {}
    export interface CompilerOptions39 extends CompilerOptions<3.9> {}
    export interface CompilerOptions40 extends CompilerOptions<4.0> {}
    export interface CompilerOptions41 extends CompilerOptions<4.1> {}
    export interface CompilerOptions42 extends CompilerOptions<4.2> {}
}
export interface TsConfig<
    TV extends ValidTypescriptVersions
> extends TsConfigJson {
    compilerOptions?: TsConfig.CompilerOptions<TV>

    /** @default 'fixedPollingInterval' */
    fallbackPolling?:
        TV extends TypescriptVersion38
            ? TsConfig.FallbackPolling
            : never

    /** @default 'useFsEvents' */
    watchDirectory?:
    TV extends TypescriptVersion38
        ? TsConfig.WatchDirectory
        : never

    /** @default 'useFsEvents' */
    watchFile?:
    TV extends TypescriptVersion38
        ? TsConfig.WatchFile
        : never
}
