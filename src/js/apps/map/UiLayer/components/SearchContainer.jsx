import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { debounce } from 'throttle-debounce'

import Box from '@material-ui/core/Box'

import ACTIONS from 'slices/app'
import { selectSearchResult } from 'selectors/map/selectSearch'
import useViewportEdgeStyles from 'styles/useViewportEdgeStyles'

import GeocodingAutocomplete from 'components/map/GeocodingAutocomplete'

import VIEW_ID from 'enum/views'

const SEARCH_ACTIONS = ACTIONS.map.search

const SearchContainer = () => {
    const classes = useViewportEdgeStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const currentResult = useSelector(selectSearchResult)

    const [hasBeenAddedToHistory, setHasBeenAddedToHistory] = useState(false)

    const addToHistory = (result) => {
        if (hasBeenAddedToHistory) {
            return
        }

        dispatch(SEARCH_ACTIONS.result.history.add(result))
        setHasBeenAddedToHistory(true)
    }

    const setResult = (result) => (
        dispatch(SEARCH_ACTIONS.result.current.set(result))
    )

    const delayedAddToHistory = debounce(20000, addToHistory)
    const debouncedSetResult = debounce(1000, setResult)

    const handleChange = (query) => {
        dispatch(SEARCH_ACTIONS.query.set(query))
    }

    const handleClose = () => {
        if (!hasBeenAddedToHistory && currentResult) {
            addToHistory(currentResult)
        }
    }

    const handleSelect = (selectedItem) => {
        debouncedSetResult(selectedItem)
        delayedAddToHistory(selectedItem)
    }

    const handleSubmit = (selectedItem) => {
        setResult(selectedItem)
        addToHistory(selectedItem)
    }

    return (
        <Box className={classes.topLeft}>
            <GeocodingAutocomplete
                currentResult={currentResult}
                onChange={handleChange}
                onClose={handleClose}
                onMenuClick={() => { history.push(`/${VIEW_ID.menu}`) }}
                onSelect={handleSelect}
                onSubmit={handleSubmit}
            />
        </Box>
    )
}

export default SearchContainer
