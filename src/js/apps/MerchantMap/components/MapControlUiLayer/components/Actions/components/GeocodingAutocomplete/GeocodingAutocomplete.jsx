import React, { useEffect, useState, } from 'react'
import { PropTypes } from 'prop-types'

import TextField from '@material-ui/core/TextField'

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
            const country = feature.context.find(
                (entry) => (entry.id.startsWith('country.'))
            ).text_en;

            return (
                !country
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
        value,
    } = useInput();

    const {
        result,  // geojson `FeatureCollection` structure
        setQuery,
    } = useGeocoding();

    // array of geojson `Feature`s
    const [preparedResult, setPreparedResult] = useState([]);

    useEffect(
        () => { setQuery(value); },
        [value]
    );

    useEffect(
        () => {
            if (!result)
            {
                return;
            }

            setPreparedResult(
                filterFeaturesByCountry(
                    result.features
                )
            );
        },
        [result]
    );

    return (
        <>
            <TextField
                {...bind}
                label={label}
                variant="outlined"
                />
            <p>
            {
                preparedResult.map(
                    (feature) => (
                        <span key={feature.id}>{feature.place_name_de.replace(/,+/g, ',')}<br /></span>
                    )
                )
            }
            </p>
        </>
    );
};


GeocodingAutoComplete.propTypes = {};


export default GeocodingAutoComplete;
