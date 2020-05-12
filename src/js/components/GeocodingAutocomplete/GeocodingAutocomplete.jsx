import React, { useEffect, useRef, useState } from 'react'
import { PropTypes } from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'

import useGeocoding from 'hooks/useGeocoding'
import useInput from 'hooks/useInput'
import isFunction from 'util/isFunction'

import ListBoxPopper from 'components/ListBoxPopper/ListBoxPopper'

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

const useStyles = makeStyles((theme) => ({
    textField: {
        '& label.Mui-focused': {
            color: theme.palette.secondary.main
        }
    }
}))

const GeocodingAutoComplete = ({ label, onSubmit }) => {
    const {
        bind,
        setValue: setInputValue,
        value: inputValue
    } = useInput()

    const {
        result, // geojson `FeatureCollection` structure
        setQuery
    } = useGeocoding()

    // array of geojson `Feature`s
    const [preparedResult, setPreparedResult] = useState([])

    useEffect(
        () => { setQuery(inputValue) },
        [inputValue]
    )

    useEffect(
        () => {
            if (!result) {
                return
            }

            setPreparedResult(
                filterFeaturesByCountry(result.features)
            )
        },
        [result]
    )

    const textFieldRef = useRef()

    const handleSubmit = (selectedItem) => {
        setInputValue(selectedItem.placeName)

        if (isFunction(onSubmit)) {
            onSubmit(selectedItem)
        }
    }

    const classes = useStyles()

    return (
        <>
            <TextField
                {...bind}
                className={classes.textField}
                fullWidth
                inputRef={(input) => (input && input.focus())}
                label={label}
                ref={textFieldRef}
                variant="outlined"
            />
            {
                preparedResult.length > 0 && (
                    <ListBoxPopper
                        anchorEl={() => (textFieldRef.current)}
                        itemIcon={<PersonPinCircleIcon />}
                        items={
                            preparedResult.map(
                                (feature) => {
                                    const placeName =
                                        feature.place_name_de.replace(
                                            /,+/g,
                                            ','
                                        )

                                    return {
                                        label: placeName,
                                        value: {
                                            placeName,
                                            longitude: feature.center[0],
                                            latitude: feature.center[1]
                                        }
                                    }
                                }
                            )
                        }
                        onSubmit={handleSubmit}
                    />
                )}
        </>
    )
}

GeocodingAutoComplete.propTypes = {
    label: PropTypes.string,
    onSubmit: PropTypes.func
}

GeocodingAutoComplete.defaultProps = {
    label: 'Wo möchtest Du suchen?',
    onSubmit: null
}

export default GeocodingAutoComplete
