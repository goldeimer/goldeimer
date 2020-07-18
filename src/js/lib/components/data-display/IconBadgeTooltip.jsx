import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import Badge from '@material-ui/core/Badge'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useBadgeStyles = makeStyles(({ palette }) => {
    const fallbackBackgroundColor = palette.grey[700]

    return {
        badge: ({ isBordered }) => ({
            backgroundColor: fallbackBackgroundColor,
            color: palette.getContrastText(fallbackBackgroundColor),
            border: isBordered
                ? `2px solid ${palette.background.paper}`
                : 'none',
            fontWeight: 700
        })
    }
})

const IconBadgeTooltip = ({
    badgeContent,
    badgeProps: {
        classes: badgePropsClasses,
        ...badgeProps
    },
    iconProps: {
        className: iconPropsClassName,
        ...iconProps
    },
    iconComponent: IconComponent,
    isBordered,
    tooltipPlacement,
    tooltipTitle
}) => {
    const badgeClasses = useBadgeStyles({ isBordered })

    return (
        <Tooltip
            arrow
            placement={tooltipPlacement}
            title={tooltipTitle}
        >
            <Badge
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }}
                overlap='rectangle'
                {...badgeProps}
                badgeContent={badgeContent || badgeProps.content}
                classes={{
                    ...badgeClasses,
                    ...badgePropsClasses,
                    badge: clsx(
                        badgeClasses.badge,
                        badgePropsClasses.badge
                    )
                }}
            >
                <IconComponent
                    {...iconProps}
                />
            </Badge>
        </Tooltip>
    )
}

IconBadgeTooltip.propTypes = {
    badgeContent: PropTypes.number,
    badgeProps: PropTypes.shape({
        classes: PropTypes.shape({
            badge: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object
            ])
        })
    }),
    iconProps: PropTypes.shape({
        className: PropTypes.string
    }),
    iconComponent: PropTypes.elementType.isRequired,
    isBordered: PropTypes.bool,
    tooltipPlacement: PropTypes.string,
    tooltipTitle: PropTypes.string
}

IconBadgeTooltip.defaultProps = {
    badgeContent: null,
    badgeProps: {
        classes: {
            badge: {}
        }
    },
    iconProps: {},
    isBordered: true,
    tooltipPlacement: 'right-start',
    tooltipTitle: ''
}

export default IconBadgeTooltip
