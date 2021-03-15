import { ModuleKind } from '../enum'

export const isCjsModule = (kind: ModuleKind) => kind === ModuleKind.CJS
export const isEsmModule = (kind: ModuleKind) => kind === ModuleKind.ESM
export const isUmdModule = (kind: ModuleKind) => kind === ModuleKind.UMD
