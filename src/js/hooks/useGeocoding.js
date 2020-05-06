import { useEffect, useState, } from 'react'

import { freeFormGeocodingRequest } from 'util/geocoding'


const useGeocoding = (initialQuery = '') =>
{
    const [query, setQuery] = useState(initialQuery);
    const [result, setResult] = useState(null);
    const [previousQuery, setPreviousQuery] = useState(initialQuery);

    const trimAndSetQuery = (query) => {
        setQuery(query.trim());
    };

    useEffect(
        () => {
            // Throttle concurrent requests somewhat.
            // TODO: Monitor metrics, adjust.
            if (query === previousQuery)
            {
                return;
            }

            const length = query.length;
            if (length < 6)
            {
                return;
            }

            const sendGeocodingRequest = async (query) => {
                const result = await freeFormGeocodingRequest(query);
                setResult(result);
            };

            // Throttle further.
            if (
                length >= 12
                ||
                (
                    length % 2 === 0
                    ||
                    (
                        query.includes(',')
                        && query.slice(-1) !== ','
                    )
                )
            ) {
                sendGeocodingRequest(query);
                setPreviousQuery(query);
            }
        },
        [query]
    );

    return {
        query,
        result,
        setQuery: trimAndSetQuery,
    };
};


export default useGeocoding;
