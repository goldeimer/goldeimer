import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
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
    useSearchResult,
    MIN_ACTIONABLE_QUERY_LENGTH
} from '@map/search'
import VIEW_ID from '@map/views'

import Box from '@material-ui/core/Box'

import AutoCompleteSearchBox from '@lib/components/AutoCompleteSearchBox'
import SearchResultIcon from '@map/search/SearchResultIcon'

const useStyles = makeStyles((theme) => ({
    width: {
        width: 400
    }
}))

const MAX_RESULT_LENGTH = {
    total: 10,
    features: 5,
    history: 2
}

const SearchContainer = () => {
    const classes = useStyles()
    const viewportClasses = useViewportEdgeStyles()
    const selectionListClasses = useViewportEdgeStyles({
        extraSpacing: { height: 48 }
    })
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
        excludeIds: searchHistoryResults.map((entry) => entry.value.resultId),
        maxLength: derivedMaxGeocodingResultLength
    })

    const results = result ? [{
        id: result.id,
        label: result.placeName,
        value: result
    }] : [
        ...searchHistoryResults,
        ...geocodingResults,
        ...featureResults
    ]

    // TODO: Is obsolete?
    const [hasBeenAddedToHistory, setHasBeenAddedToHistory] = useState(false)
    const [showResults, setShowResults] = useState(false)

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
    const [debouncedAddToHistory] = useDebounce(addToHistory, 1000)
    const [debouncedSetResult] = useDebounce(setResult, 1000)

    /// ------------------------- event handlers ------------------------------

    const handleBlur = () => {
        setShowResults(false)
    }
    const handleFocus = () => {
        setShowResults(true)
    }

    const handleChange = ({ target: { value } }) => {
        if (result && value === result.placeName) {
            return
        }

        setShowResults(true)

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
        setShowResults(false)
        debouncedAddToHistory(selectedItem)
    }

    /* eslint-disable react/prop-types */
    const renderItemIcon = ({ id, type }) => (
        <SearchResultIcon
            id={id}
            fontSize='small'
            type={type.value}
        />
    )
    /* eslint-enable react/prop-types */

    return (
        <Box className={clsx(viewportClasses.topLeft, classes.width)}>
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
                selectionListClasses={selectionListClasses}
                showResults={showResults}
                showNoteOnEmpty={query.length >= MIN_ACTIONABLE_QUERY_LENGTH}
                value={result && result.placeName ? result.placeName : query}
                withMenuButton
            />
        </Box>
    )
}

export default SearchContainer
