/// TODO(Johannes):
/// Deprecate, especially from the library source.
/// (Too specific.)

import React from 'react'

import { RasterIcon } from '@goldeimer/react-components'

import GoldeimerPng
    from '@goldeimer/img-asset-lib/icon/brand/goldeimer.icon.png'

const GoldeimerIcon = (props) => <RasterIcon {...props} src={GoldeimerPng} />

export default GoldeimerIcon
