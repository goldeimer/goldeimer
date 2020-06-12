import React, { memo } from 'react'

import InlineSvgIcon from '@lib/components/InlineSvgIcon'

import markerBackgroundSvg from 'img/icons/map/marker.background'

const MarkerBackgroundIcon = (props) => (
    <InlineSvgIcon svg={markerBackgroundSvg} viewBox='0 0 14 20' {...props} />
)

export default memo(MarkerBackgroundIcon)
