const isDevelopmentBuild = /*@__PURE__*/ () => (
    process.env.NODE_ENV === 'development'
)

const isProductionBuild = /*@__PURE__*/ () => !isDevelopmentBuild()

export {
    isDevelopmentBuild,
    isProductionBuild
}
