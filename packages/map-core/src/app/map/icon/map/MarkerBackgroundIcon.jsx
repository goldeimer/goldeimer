import React, { memo } from 'react'

import { InlineSvgIcon } from '@goldeimer/react-components'

import markerBackgroundSvg
    from '@goldeimer/img-asset-lib/icon/map/marker.background.svg'

const MarkerBackgroundIcon = (props) => (
    <InlineSvgIcon svg={markerBackgroundSvg} viewBox="0 0 14 20" {...props} />
)

export default memo(MarkerBackgroundIcon)
