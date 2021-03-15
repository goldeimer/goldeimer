import { CompilerKind, ModuleKind } from '../enum'

type IsoLanguageCode = 'DummyType'

export const enum BundlerKind {
    Rollup,
    Webpack
}

export interface BuildInfo {
    bundle: {
        bundler: {
            id: BundlerKind,
            optionsHash: string,
            name: keyof typeof BundlerKind
        },
        timestamp: Date
    },
    compilation: {
        compiler: {
            id: CompilerKind,
            optionsHash: string,
            name: keyof typeof CompilerKind
        },
        timestamp: Date
    },
    i18n: {
        default: IsoLanguageCode,
        formal: boolean,
        languages: IsoLanguageCode[]
    },
    module: {
        type: {
            id: ModuleKind,
            name: keyof typeof ModuleKind
        }
    }
}
