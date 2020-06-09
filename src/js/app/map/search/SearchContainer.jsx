import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useDebounce from '@lib/hooks/useDebounce'
import useViewportEdgeStyles from '@lib/styles/useViewportEdgeStyles'

import SEARCH, {
    geocodingResultIsDach,
    useGeocodingSearchResults,
    useQueriedFeatureSearchResults,
    useQueriedSearchHistoryResults,
    useQuery,
    useSearchResult
} from '@map/search'
import VIEW_ID from '@map/views'

import Box from '@material-ui/core/Box'

import AutoCompleteSearchBox from '@lib/components/AutoCompleteSearchBox'
import SearchResultIcon from '@map/search/SearchResultIcon'

const MAX_RESULT_LENGTH = {
    total: 8,
    features: 3,
    history: 2
}

const SearchContainer = () => {
    const classes = useViewportEdgeStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const query = useQuery()
    const result = useSearchResult()

    const featureResults = useQueriedFeatureSearchResults({
        maxLength: MAX_RESULT_LENGTH.features
    })

    const searchHistoryResults = useQueriedSearchHistoryResults({
        maxLength: MAX_RESULT_LENGTH.history
    })

    const derivedMaxGeocodingResultLength = MAX_RESULT_LENGTH.total - (
        featureResults.length +
        searchHistoryResults.length
    )

    const geocodingResults = useGeocodingSearchResults({
        condition: geocodingResultIsDach,
        maxLength: derivedMaxGeocodingResultLength
    })

    const results = [
        ...searchHistoryResults,
        ...geocodingResults,
        ...featureResults
    ]

    // TODO: Is obsolete?
    const [hasBeenAddedToHistory, setHasBeenAddedToHistory] = useState(false)

    /// --------------------------- event util --------------------------------

    const addToHistory = (rslt, qry = query) => {
        if (hasBeenAddedToHistory) {
            return
        }

        dispatch(SEARCH.result.add({ query: qry, result: rslt }))
        setHasBeenAddedToHistory(true)
    }

    const setResult = (rslt) => (
        dispatch(SEARCH.result.set(rslt))
    )

    const [delayedAddToHistory] = useDebounce(addToHistory, 20000)
    const [debouncedSetResult] = useDebounce(setResult, 1000)

    /// ------------------------- event handlers ------------------------------

    const handleBlur = () => {}
    const handleFocus = () => {}

    const handleChange = ({ target: { value } }) => {
        console.log(value)

        if (result && value === result.placeName) {
            return
        }

        if (result) {
            dispatch([
                SEARCH.result.reset(),
                SEARCH.query.set(value)
            ])

            return
        }

        dispatch(SEARCH.query.set(value))
    }

    // const handleClose = () => {
    //     if (!hasBeenAddedToHistory && currentResult) {
    //         addToHistory(currentResult)
    //     }
    // }

    const handleSelect = (selectedItem) => {
        debouncedSetResult(selectedItem)
        delayedAddToHistory(selectedItem, query)
    }

    const handleSubmit = (selectedItem) => {
        setResult(selectedItem)
        addToHistory(selectedItem)
    }

    /* eslint-disable react/prop-types */
    const renderItemIcon = ({ id, type }) => (
        <SearchResultIcon
            id={id}
            size='small'
            type={type.value}
        />
    )
    /* eslint-enable react/prop-types */

    return (
        <Box className={classes.topLeft}>
            <AutoCompleteSearchBox
                defaultItemIcon={<SearchResultIcon />}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onMenuClick={() => { history.push(`/${VIEW_ID.menu}`) }}
                onSelect={handleSelect}
                onSubmit={handleSubmit}
                renderItemIcon={renderItemIcon}
                results={results}
                value={result && result.placeName ? result.placeName : query}
                withMenuButton
            />
        </Box>
    )
}

export default SearchContainer
