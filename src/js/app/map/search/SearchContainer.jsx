import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useDebounce from '@lib/hooks/useDebounce'
import useEdgeStyles from '@lib/styles/useEdgeStyles'
import useInput from '@lib/hooks/useInput'

import CONTEXT from '@map/context'
import { detailToFeatureContext } from '@map/features'
import ROUTE from '@map/routes'
import SEARCH, {
    geocodingResultIsDach,
    useGeocodingSearchResults,
    useQueriedFeatureSearchResults,
    useQueriedSearchHistoryResults,
    useQuery,
    useSearchResult,
    ADDITIONAL_THROTTLE_THRESHOLD_QUERY_LENGTH,
    MIN_ACTIONABLE_QUERY_LENGTH
} from '@map/search'
import VIEW from '@map/view'

import Box from '@material-ui/core/Box'

import AutoCompleteOmniBox from '@lib/components/AutoCompleteOmniBox'
import SearchResultIcon from '@map/search/SearchResultIcon'

const useStyles = makeStyles(({ zIndex }) => ({
    root: {
        width: 400,
        zIndex: zIndex.appBar
    }
}))

const MAX_RESULT_LENGTH = {
    total: 10,
    features: 5,
    history: 2
}

const SearchContainer = () => {
    const returnFocusRef = useRef()

    const classes = useStyles()
    const viewClasses = useEdgeStyles()
    const selectionListClasses = useEdgeStyles({
        extraSpacing: { height: 48 }
    })
    const dispatch = useDispatch()
    const history = useHistory()

    const { setValue: setInputValue, value: inputValue } = useInput()

    const [hasBeenAddedToHistory, setHasBeenAddedToHistory] = useState(false)
    const [isResultActive, setIsResultActive] = useState(false)
    const [showResults, setShowResults] = useState(false)

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
        excludeIds: searchHistoryResults.map(
            (entry) => [entry.value.id, entry.value.resultId]
        ).flat(),
        maxLength: derivedMaxGeocodingResultLength
    })

    const results = result && isResultActive ? [{
        id: result.id,
        isDisabled: true,
        label: result.placeName,
        value: result
    }] : [
        ...searchHistoryResults,
        ...geocodingResults,
        ...featureResults
    ]

    /// --------------------------- event util --------------------------------

    const setQuery = (value) => dispatch(SEARCH.query.set(value))

    const [
        throttledSetQuery,
        cancelThrottledSetQuery
    ] = useDebounce(setQuery, 400, true, true)
    const [
        moreThrottledSetQuery,
        cancelMoreThrottledSetQuery
    ] = useDebounce(setQuery, 800, true, true)

    const addToHistory = (rslt, qry = query) => {
        if (hasBeenAddedToHistory) {
            return
        }

        dispatch(SEARCH.result.add({ query: qry, result: rslt }))
        setHasBeenAddedToHistory(true)
    }

    const setResult = (rslt) => {
        dispatch([
            SEARCH.result.set(rslt),
            // CONTEXT.set(detailToFeatureContext()),
            VIEW.transition.flyTo({ ...rslt, zoom: 13 })
        ])

        cancelThrottledSetQuery()
        cancelMoreThrottledSetQuery()
    }

    const [debouncedAddToHistory] = useDebounce(addToHistory, 1000)
    const [debouncedSetResult] = useDebounce(setResult, 500)

    /// ------------------------- event handlers ------------------------------

    const handleBlur = () => {
        setShowResults(false)

        if (result) {
            setIsResultActive(true)
        }
    }

    const handleFocus = () => {
        setShowResults(true)
    }

    const handleChange = ({ target: { value } }) => {
        if (result && value === result.placeName) {
            if (returnFocusRef.current) {
                returnFocusRef.current()
            }

            return
        }

        setShowResults(true)
        setIsResultActive(false)
        setInputValue(value)

        if (result) {
            dispatch(SEARCH.result.reset())
            setHasBeenAddedToHistory(false)
        }

        if (
            value.length &&
            value.length > ADDITIONAL_THROTTLE_THRESHOLD_QUERY_LENGTH
        ) {
            moreThrottledSetQuery(value)
            return
        }

        throttledSetQuery(value)
    }

    const handleSelect = (selectedItem, returnFocus) => {
        returnFocusRef.current = returnFocus
        debouncedSetResult(selectedItem)
    }

    const handleSubmit = (selectedItem) => {
        setResult(selectedItem)
        setShowResults(false)
        debouncedAddToHistory(selectedItem, query)
    }

    /* eslint-disable react/prop-types */
    const renderItemIcon = ({ type, ...other }) => (
        <SearchResultIcon
            fontSize='small'
            type={type.value}
            {...other}
        />
    )
    /* eslint-enable react/prop-types */

    return (
        <Box className={clsx(viewClasses.topLeft, classes.root)}>
            <AutoCompleteOmniBox
                defaultItemIcon={<SearchResultIcon />}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onMenuClick={() => { history.push(`/${ROUTE.menu.key}`) }}
                onSelect={handleSelect}
                onSubmit={handleSubmit}
                renderItemIcon={renderItemIcon}
                results={results}
                selectionListClasses={selectionListClasses}
                showResults={showResults}
                showNoteOnEmpty={query.length >= MIN_ACTIONABLE_QUERY_LENGTH}
                value={
                    result && result.placeName
                        ? result.placeName
                        : inputValue
                }
                withMenuButton
            />
        </Box>
    )
}

export default SearchContainer
