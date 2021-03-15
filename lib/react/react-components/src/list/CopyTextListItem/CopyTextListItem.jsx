import React from 'react'
import PropTypes from 'prop-types'

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

import StandardListItem from '../StandardListItem'

const CopyTextListItem = ({
    onClick,
    onCopy,
    primaryText,
    secondaryActions,
    value,
    ...standardListProps
}) => {
    const copyLabel = 'Kopieren'

    const copyValue = value || primaryText

    if (!copyValue) {
        return null
    }

    const actions = (secondaryActions || []).concat([{
        iconComponent: FileCopyOutlinedIcon,
        label: copyLabel,
        onClick: onCopy,
        value: copyValue
    }])

    return (
        <StandardListItem
            {...standardListProps}
            primaryText={primaryText}
            secondaryIconActions={actions}
            onClick={onClick || onCopy}
            value={copyValue}
        />
    )
}

CopyTextListItem.propTypes = {
    onClick: PropTypes.func,
    onCopy: PropTypes.func,
    primaryText: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    ...StandardListItem.propTypes
}

CopyTextListItem.defaultProps = {
    onClick: null,
    onCopy: null,
    primaryText: null,
    value: null
}

export default CopyTextListItem
