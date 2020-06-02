import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { debounce } from 'throttle-debounce'

import Box from '@material-ui/core/Box'

import APP from '@app/app'
import { selectSearchResult } from '@map/search/selectSearch'
import useViewportEdgeStyles from '@lib/styles/useViewportEdgeStyles'

import GeocodingAutocomplete from '@map/search/GeocodingAutocomplete'

import VIEW_ID from '@map/views'

const SEARCH = APP.map.search

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

        dispatch(SEARCH.result.add(result))
        setHasBeenAddedToHistory(true)
    }

    const setResult = (result) => (
        dispatch(SEARCH.result.set(result))
    )

    const delayedAddToHistory = debounce(20000, addToHistory)
    const debouncedSetResult = debounce(1000, setResult)

    const handleChange = (query) => {
        dispatch(SEARCH.query.set(query))
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
