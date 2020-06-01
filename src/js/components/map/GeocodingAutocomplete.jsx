import React, { useEffect, useRef, useState } from 'react'
import { PropTypes } from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'

import MarkerIcon from '@material-ui/icons/Room'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import { generateShortId } from 'utilities/generateId'
import isFunction from 'utilities/isFunction'
import useGeocoding from 'hooks/map/useGeocoding'
import useInput from 'hooks/useInput'

import SelectionList from 'components/SelectionList'

// TODO:
// Make dynamic.
// Move higher up in the component hierarchy.
// @note maptiler.com does not return ISO country codes...
const DACH_REGION_COUNTRIES = ['Austria', 'Germany', 'Switzerland']

const filterFeaturesByCountry = (features) => features.filter(
    (feature) => {
        if (!('context' in feature) || !feature.context) {
            return true
        }

        const countryEntry = feature.context.find(
            (entry) => (entry.id.startsWith('country.'))
        )

        if (!('text_en' in countryEntry) || !countryEntry.text_en) {
            return true
        }

        const country = countryEntry.text_en

        return (
            !country ||
                DACH_REGION_COUNTRIES.includes(country)
        )
    }
)

const getPlaceNameFromFeature = (feature) => feature.place_name_de.replace(
    /,+/g,
    ','
)

const makeSuggestion = (feature) => {
    const placeName = getPlaceNameFromFeature(feature)

    return {
        label: placeName,
        value: {
            id: feature.id ? feature.id : generateShortId(),
            longitude: feature.center[0],
            latitude: feature.center[1],
            placeName
        }
    }
}

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

const defaultSuggestions = []

const GeocodingAutoComplete = ({
    label,
    onMenuClick,
    onSelect,
    onSubmit
}) => {
    const {
        bind,
        setValue: setInputValue,
        value: inputValue
    } = useInput()

    const {
        result, // geojson `FeatureCollection` structure
        setQuery
    } = useGeocoding()

    const [selectedSuggestion, setSelectedSuggestion] = useState(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [suggestions, setSuggestions] = useState(defaultSuggestions)
    const [hasHadResults, setHasHadResults] = useState(false)

    const rootRef = useRef()

    useEffect(() => {
        if (
            selectedSuggestion &&
            inputValue === selectedSuggestion.placeName
        ) {
            return
        }

        if (!inputValue) {
            setHasHadResults(false)
        }

        setQuery(inputValue)
    }, [inputValue, selectedSuggestion, setQuery])

    useEffect(() => {
        if (!result) {
            setSuggestions(defaultSuggestions)

            return
        }

        setHasHadResults(true)

        setSuggestions(
            filterFeaturesByCountry(result.features).map(
                (feature) => makeSuggestion(feature)
            )
        )
    }, [result])

    useEffect(() => {
        if (!selectedSuggestion) {
            return
        }

        setInputValue(selectedSuggestion.placeName)
    }, [selectedSuggestion, setInputValue])

    const handleSelect = (handledSuggestion) => {
        setSelectedSuggestion(handledSuggestion)

        if (isFunction(onSelect)) {
            onSelect(handledSuggestion)
        }
    }

    const handleSuggestionClick = (handledSuggestion) => {
        handleSubmit(handledSuggestion)
    }

    const handleSubmit = (handledSuggestion = null) => {
        setShowSuggestions(false)

        if (handledSuggestion) {
            handleSelect(handledSuggestion)
        }

        if (isFunction(onSubmit)) {
            onSubmit(
                handledSuggestion || selectedSuggestion
            )
        }
    }

    const classes = useStyles()

    return (
        <Paper
            className={classes.root}
            elevation={3}
            ref={rootRef}
        >
            <Box display='flex' px={0.5} py={0.25}>
                {isFunction(onMenuClick) && (
                    <IconButton
                        aria-label='Menü'
                        className={classes.iconButton}
                        onClick={onMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <InputBase
                    {...bind}
                    autoComplete='off'
                    autoFocus
                    className={classes.inputBase}
                    inputProps={{ 'aria-label': label }}
                    onBlur={(event) => {
                        if (rootRef.current.contains(event.relatedTarget)) {
                            return
                        }

                        setShowSuggestions(false)
                    }}
                    onFocus={() => { setShowSuggestions(true) }}
                    placeholder={label}
                />
                <IconButton
                    aria-label='search'
                    className={clsx(classes.iconButton, classes.submit)}
                    onClick={handleSubmit}
                >
                    <SearchIcon />
                </IconButton>
            </Box>
            <Collapse
                in={showSuggestions && (
                    suggestions.length === 0 || hasHadResults
                )}
                timeout='auto'
                unmountOnExit
            >
                <Divider />
                <SelectionList
                    itemIcon={<MarkerIcon size='small' />}
                    items={suggestions}
                    onItemClick={handleSuggestionClick}
                    onSelect={handleSelect}
                    showNoteOnEmpty={hasHadResults}
                />
            </Collapse>
        </Paper>
    )
}

GeocodingAutoComplete.propTypes = {
    label: PropTypes.string,
    onMenuClick: PropTypes.func,
    onSelect: PropTypes.func,
    onSubmit: PropTypes.func
}

GeocodingAutoComplete.defaultProps = {
    label: 'In meiner Umgebung suchen',
    onMenuClick: null,
    onSelect: null,
    onSubmit: null
}

export default GeocodingAutoComplete
