import React, { useRef, useState } from 'react'
import { PropTypes } from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import SelectionList from '@lib/components/SelectionList'

import noop from '@lib/util/noop'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: `calc(100% - ${theme.spacing(2)}px)`,
        fallbacks: {
            maxWidth: '96%'
        },
        width: 'auto',
        [`@media (min-width: ${400 + theme.spacing(2)}px)`]: {
            width: 400
        }
    },
    iconButton: {
        padding: 10,
        '&:hover': {
            backgroundColor: 'inherit'
        }
    },
    submit: {
        '&:hover': {
            color: theme.palette.primary.dark
        }
    },
    inputBase: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: theme.palette.text.secondary,
        '& input:focus': {
            color: theme.palette.text.primary
        }
    }
}))

const AutoCompleteSearchBox = ({
    defaultItemIcon,
    label,
    onBlur,
    onChange,
    onFocus,
    onMenuClick,
    onSelect,
    onSubmit,
    renderItemIcon,
    results,
    showNoteOnEmpty,
    value,
    withMenuButton
}) => {
    const rootRef = useRef()

    const classes = useStyles()

    const [showResults, setShowResults] = useState(false)

    const isResultSelectionOpen = showResults && (
        results.length > 0 || showNoteOnEmpty
    )

    return (
        <Paper
            className={classes.root}
            elevation={3}
            ref={rootRef}
        >
            <Box display='flex' px={0.5} py={0.25}>
                {withMenuButton && (
                    <IconButton
                        aria-label='Menü'
                        className={classes.iconButton}
                        onClick={onMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <InputBase
                    autoComplete='off'
                    autoFocus
                    className={classes.inputBase}
                    inputProps={{ 'aria-label': label }}
                    onBlur={(event) => {
                        if (rootRef.current.contains(event.relatedTarget)) {
                            return
                        }

                        setShowResults(false)
                        onBlur(event)
                    }}
                    onFocus={(event) => {
                        setShowResults(true)
                        onFocus(event)
                    }}
                    onChange={onChange}
                    placeholder={label}
                    value={value}
                />
                {
                    // TODO: Is this button needed?
                }
                <IconButton
                    aria-label='search'
                    className={clsx(classes.iconButton, classes.submit)}
                    // onClick={}
                >
                    <SearchIcon />
                </IconButton>
            </Box>
            <Collapse
                in={isResultSelectionOpen}
                timeout='auto'
                // unmountOnExit
            >
                <Divider />
                <SelectionList
                    defaultItemIcon={defaultItemIcon}
                    items={results}
                    onItemClick={onSubmit}
                    onSelect={onSelect}
                    renderItemIcon={renderItemIcon}
                    showNoteOnEmpty={showNoteOnEmpty}
                />
            </Collapse>
        </Paper>
    )
}

AutoCompleteSearchBox.propTypes = {
    defaultItemIcon: PropTypes.node,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onMenuClick: PropTypes.func,
    onSelect: PropTypes.func,
    onSubmit: PropTypes.func,
    renderItemIcon: PropTypes.func,
    results: PropTypes.arrayOf(PropTypes.shape({
        some: PropTypes.string
    })),
    showNoteOnEmpty: PropTypes.bool,
    value: PropTypes.string,
    withMenuButton: PropTypes.bool
}

AutoCompleteSearchBox.defaultProps = {
    defaultItemIcon: null,
    label: 'In meiner Umgebung suchen',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onMenuClick: noop,
    onSelect: noop,
    onSubmit: noop,
    renderItemIcon: null,
    results: [],
    showNoteOnEmpty: false,
    value: '',
    withMenuButton: false
}

export default AutoCompleteSearchBox
