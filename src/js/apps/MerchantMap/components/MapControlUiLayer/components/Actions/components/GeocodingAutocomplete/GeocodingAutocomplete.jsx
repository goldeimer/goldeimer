import React, { useEffect, useRef, useState, } from 'react'
import { PropTypes } from 'prop-types'

import TextField from '@material-ui/core/TextField'
import ExploreIcon from '@material-ui/icons/Explore'

import ListBoxPopper from 'components/ListBoxPopper/ListBoxPopper'

import useGeocoding from 'hooks/useGeocoding'
import useInput from 'hooks/useInput'


// TODO:
// Make dynamic.
// Move higher up in the component hierarchy.
// @note maptiler.com does not return ISO country codes...
const DACH_REGION_COUNTRIES = ['Austria', 'Germany', 'Switzerland',];


const filterFeaturesByCountry = (features) =>
{
    return features.filter(
        (feature) => {
            if (! 'context' in feature || ! feature.context)
            {
                return true;
            }

            const countryEntry = feature.context.find(
                (entry) => (entry.id.startsWith('country.'))
            );

            if (! 'text_en' in countryEntry || ! countryEntry.text_en)
            {
                return true;
            }

            const country = countryEntry.text_en;

            return (
                ! country
                ||
                DACH_REGION_COUNTRIES.includes(country)
            );
        }
    );
};


const GeocodingAutoComplete = ({
    label = 'Wo möchtest Du suchen?',
}) =>
{
    const {
        bind,
        setValue: setInputValue,
        value: inputValue,
    } = useInput();

    const {
        result,  // geojson `FeatureCollection` structure
        setQuery,
    } = useGeocoding();

    // array of geojson `Feature`s
    const [preparedResult, setPreparedResult] = useState([]);

    useEffect(
        () => { setQuery(inputValue); },
        [inputValue]
    );

    useEffect(
        () => {
            if (!result)
            {
                return;
            }

            setPreparedResult(
                filterFeaturesByCountry(result.features)
            );
        },
        [result]
    );

    const inputRef = useRef();

    const handleSelect = (selectedItem) =>
    {
        setInputValue(selectedItem.placeName);

        // TODO:
        // Dispatch map viewport state change.
        // (Once redux has been integrated.)
        console.log(selectedItem);
    };

    return (
        <>
            <TextField
                {...bind}
                fullWidth
                label={label}
                ref={inputRef}
                variant="outlined"
            />
            {
                preparedResult.length > 0
                &&
                <ListBoxPopper
                    anchorEl={() => (inputRef.current)}
                    itemIcon={<ExploreIcon />}
                    items={
                        preparedResult.map(
                            (feature) => {
                                const placeName = feature.place_name_de.replace(
                                    /,+/g,
                                    ','
                                );

                                return {
                                    label: placeName,
                                    value: {
                                        placeName,
                                        longitude: feature.center[0],
                                        latitude: feature.center[1],
                                    },
                                };
                            }
                        )
                    }
                    onSelect={handleSelect}
                />
            }
        </>
    );
};


GeocodingAutoComplete.propTypes = {};


export default GeocodingAutoComplete;
