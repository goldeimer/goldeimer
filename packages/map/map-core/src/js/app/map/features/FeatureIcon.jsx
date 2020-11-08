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
    component: Component,
    fontSize
}) => {
    const classes = useStyles({ color })

    return (
        <Component
            className={clsx(
                classes.root,
                classNameProp
            )}
            fontSize={fontSize}
        />
    )
}

FeatureIcon.propTypes = {
    className: PropTypes.string,
    color: PropTypeColor,
    component: PropTypes.elementType.isRequired,
    fontSize: PropTypes.string
}

FeatureIcon.defaultProps = {
    className: '',
    color: null,
    fontSize: 'default'
}

export default memo(FeatureIcon)
