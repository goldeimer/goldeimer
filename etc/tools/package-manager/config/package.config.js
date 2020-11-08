import { merge } from 'webpack-merge'

import DEFAULTS from './package.config.defaults'

const packageConfig = (options) => merge(DEFAULTS, options)

export default packageConfig
