export const enum CompilerKind {
    Babel,
    Tsc
}

export const isBabel = (kind: CompilerKind) => kind === CompilerKind.Babel
export const isTsc = (kind: CompilerKind) => kind === CompilerKind.Tsc
