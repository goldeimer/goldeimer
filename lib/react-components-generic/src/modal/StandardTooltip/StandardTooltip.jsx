import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'

import { useTheme } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

import { generateShortId } from '@lib/util/generateId'

const StandardTooltip = ({
    children,
    title,
    ...tooltipProps
}) => {
    const { spacing } = useTheme()

    const accessibilityId = generateShortId()

    return (
        <Tooltip
            arrow
            aria-label={title}
            enterNextDelay={300}
            id={accessibilityId}
            placement='right'
            PopperProps={{
                modifiers: {
                    flip: {
                        enabled: true,
                        padding: spacing(1)
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: 'viewport',
                        padding: spacing(1)
                    }
                }
            }}
            title={title}
            {...tooltipProps}
        >
            {cloneElement(
                children,
                { 'aria-describedby': accessibilityId }
            )}
        </Tooltip>
    )
}

StandardTooltip.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
}

export default StandardTooltip
