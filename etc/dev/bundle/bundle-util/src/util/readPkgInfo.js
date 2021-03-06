import { pkgInfo } from './pkgInfo'

export const readPkgInfo = (pkgPath) => pkgInfo(
    // eslint-disable-next-line import/no-dynamic-require
    require(`${pkgPath}/package.json`)
)

export default readPkgInfo
