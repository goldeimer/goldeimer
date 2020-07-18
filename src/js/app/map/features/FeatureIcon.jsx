import React, { memo } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import PropTypeColor from '@map/features/PropTypeColor'

const useStyles = makeStyles(({
    palette,
    shape: { borderRadius }
}) => ({
    root: ({ color }) => {
        const backgroundColor = color ? color.main : palette.grey[600]
        const iconColor = color ? color.contrastText : palette.common.white

        return {
            backgroundColor,
            borderRadius,
            color: iconColor
        }
    }
}), { name: 'FeatureIcon' })

const FeatureIcon = ({
    className: classNameProp,
    color,
    fontSize,
    iconComponent: IconComponent
}) => {
    const classes = useStyles({ color })

    return (
        <IconComponent
            className={clsx(
                classes.root,
                classNameProp
            )}
            color={color}
            fontSize={fontSize}
        />
    )
}

FeatureIcon.propTypes = {
    className: PropTypes.string,
    color: PropTypeColor,
    fontSize: PropTypes.string,
    iconComponent: PropTypes.elementType
}

FeatureIcon.defaultProps = {
    className: null,
    color: null,
    fontSize: 'default',
    iconComponent: null
}

export default memo(FeatureIcon)
