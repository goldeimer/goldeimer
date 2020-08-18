import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import ToggleSwitchListItem from
    '@lib/components/buttons/ToggleSwitchListItem'

const useStyles = makeStyles((theme) => ({
    subheader: {
        lineHeight: `${theme.spacing(4.5)}px`,
        paddingTop: theme.spacing(0.5)
    }
}))

const ToggleSwitchList = ({
    items,
    onChange,
    selectedIds,
    title,
    ...other
}) => {
    const classes = useStyles()

    return (
        <List
            dense
            subheader={(
                <ListSubheader
                    className={classes.subheader}
                >
                    {title}
                </ListSubheader>
            )}
            {...other}
        >
            {items.map(
                ({ itemKey, label, iconComponent = null }) => (
                    <ToggleSwitchListItem
                        onChange={() => { onChange(itemKey) }}
                        iconComponent={iconComponent}
                        isSelected={selectedIds.includes(itemKey)}
                        itemKey={itemKey}
                        key={itemKey}
                        label={label}
                    />
                )
            )}
        </List>
    )
}

ToggleSwitchList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.exact({
            itemKey: PropTypes.string,
            label: PropTypes.string,
            iconComponent: PropTypes.elementType
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    ).isRequired,
    title: PropTypes.string.isRequired
}

export default ToggleSwitchList
