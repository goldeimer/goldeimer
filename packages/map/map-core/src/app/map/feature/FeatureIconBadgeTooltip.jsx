import React from 'react'

import { IconBadgeTooltip } from '@goldeimer/react-components'

import FeatureIcon from './FeatureIcon'

const FeatureIconBadgeTooltip = ({
    iconComponent: IconComponent,
    ...other
}) => (
    <IconBadgeTooltip
        {...other}
        iconComponent={FeatureIcon}
        iconProps={{
            component: IconComponent
        }}
    />
)

FeatureIconBadgeTooltip.propTypes = IconBadgeTooltip.propTypes

export default IconBadgeTooltip
