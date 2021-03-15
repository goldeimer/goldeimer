import { TsConfig } from '../../schema'

export const linterChecks: TsConfig.CompilerOptions41 = {
    noFallthroughCasesInSwitch: true,
    noImplicitReturns: true,
    noUncheckedIndexedAccess: true,
    noUnusedLocals: true,
    noUnusedParameters: true
}
