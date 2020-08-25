import React from 'react'

// TODO: Make the icon dynamic.
import StorefrontIcon from '@material-ui/icons/Storefront'

import IconMarker from '../IconMarker/IconMarker'

const FeatureMarker = (props) => (
    <IconMarker
        {...props}
        iconComponent={<StorefrontIcon />}
    />
)

export default FeatureMarker
