const isDevelopmentBuild = /*@__PURE__*/ (proc) => (
    proc.env.NODE_ENV === 'development'
)

const isProductionBuild = /*@__PURE__*/ (proc) => !isDevelopmentBuild(proc)

export {
    isDevelopmentBuild,
    isProductionBuild
}
