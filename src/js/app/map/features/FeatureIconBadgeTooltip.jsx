import React from 'react'

import { IconBadgeTooltip } from '@lib/components/data-display'

import FeatureIcon from '@map/features/FeatureIcon'

const FeatureIconBadgeTooltip = ({
    iconComponent: IconComponent,
    ...other
}) => (
    <IconBadgeTooltip
        {...other}
        iconComponent={FeatureIcon}
        iconProps={{
            iconComponent: IconComponent
        }}
    />
)

FeatureIconBadgeTooltip.propTypes = IconBadgeTooltip.propTypes

export default IconBadgeTooltip
