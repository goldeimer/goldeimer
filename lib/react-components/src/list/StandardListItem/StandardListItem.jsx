import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import clsx from 'clsx'

import StandardListItemSecondaryAction
    from '../StandardListItemSecondaryAction'
import StandardListItemSecondaryIconAction
    from '../StandardListItemSecondaryIconAction'

const useStyles = makeStyles(({ palette, spacing }) => ({
    listItemText: ({ listItemTextMargin }) => ({
        marginRight: spacing(listItemTextMargin),
        '& .MuiTypography-root': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    }),
    secondaryAction2: {
        //   2 by default (i.e. value for the first button)
        // + 1 for "margin"
        // + 3 to shift by an icon's with
        right: spacing(6)
    },
    secondaryAction3: {
        right: spacing(9)
    }
}))

const StandardListItem = ({
    className,
    iconComponent: IconComponent,
    iconProps,
    isIconTighter,
    label,
    listItemTextMargin,
    onClick,
    onMouseEnter,
    onMouseLeave,
    primaryText,
    secondaryAction,
    secondaryIconActions,
    secondaryText,
    value
}) => {
    const classes = useStyles({ listItemTextMargin })

    const handleClick = (event) => {
        if (onClick) {
            onClick(event, value)
        }
    }

    const handleMouseEnter = (event) => {
        if (onMouseEnter) {
            onMouseEnter(event, value)
        }
    }

    const handleMouseLeave = (event) => {
        if (onMouseLeave) {
            onMouseLeave(event, value)
        }
    }

    return (
        <ListItem
            button={onClick !== null}
            className={className}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="listitem"
        >
            <ListItemIcon className={clsx({ tighter: isIconTighter })}>
                <IconComponent {...iconProps} />
            </ListItemIcon>
            <Tooltip
                arrow
                enterDelay={300}
                enterNextDelay={500}
                placement="bottom"
                title={label || ''}
            >
                <ListItemText
                    className={classes.listItemText}
                    primary={primaryText}
                    secondary={secondaryText}
                />
            </Tooltip>
            {secondaryIconActions && secondaryIconActions.map(({
                className: actionClassName,
                label: actionLabel,
                ...props
            }, index) => (
                <StandardListItemSecondaryIconAction
                    key={`list-item-secondary-action:${actionLabel}`}
                    {...props}
                    label={actionLabel}
                    className={clsx({
                        [classes.secondaryAction]: classes.secondaryAction,
                        [classes.secondaryAction2]: index === 1,
                        [classes.secondaryAction3]: index === 2,
                        actionClassName
                    })}
                />
            ))}
            {secondaryAction && (
                <StandardListItemSecondaryAction>
                    {secondaryAction}
                </StandardListItemSecondaryAction>
            )}
        </ListItem>
    )
}

StandardListItem.propTypes = {
    className: PropTypes.string,
    iconComponent: PropTypes.elementType.isRequired,
    iconProps: PropTypes.shape({
        className: PropTypes.string
    }),
    isIconTighter: PropTypes.bool,
    label: PropTypes.string,
    listItemTextMargin: PropTypes.number,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    primaryText: PropTypes.string,
    secondaryAction: PropTypes.element,
    secondaryIconActions: PropTypes.arrayOf(
        PropTypes.shape(
            StandardListItemSecondaryIconAction.propTypes
        )
    ),
    secondaryText: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

StandardListItem.defaultProps = {
    className: null,
    iconProps: {},
    isIconTighter: true,
    label: null,
    listItemTextMargin: 7.5,
    onClick: null,
    onMouseEnter: null,
    onMouseLeave: null,
    primaryText: null,
    secondaryAction: null,
    secondaryIconActions: [],
    secondaryText: null,
    value: null
}

export default StandardListItem
