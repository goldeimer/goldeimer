/// TODO(Johannes):
/// Deprecate, especially from the library source.
/// (Too specific.)

import React from 'react'

import { RasterIcon } from '@goldeimer/react-components'

// TODO(Johannes): fix import
import VivaConAguaPng
    from '@goldeimer/img-asset-lib/icon/brand/viva-con-agua.icon.png'

const VivaConAguaIcon = (props) => (
    <RasterIcon {...props} src={VivaConAguaPng} />
)

export default VivaConAguaIcon
