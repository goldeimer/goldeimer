import { TsConfig } from '../../schema'

export const strictChecks: TsConfig.CompilerOptions41 = {
    alwaysStrict: true,
    noImplicitAny: true,
    noImplicitThis: true,
    strict: true,
    strictBindCallApply: true,
    strictFunctionTypes: true,
    strictNullChecks: true,
    strictPropertyInitialization: true
}
