import { useEffect, useState } from 'react'
import { throttle, debounce } from 'throttle-debounce'

import { freeFormGeocodingRequest } from 'util/map/geocoding'

const MIN_QUERY_LENGTH = 3
const DEBOUNCE_THRESHOLD_QUERY_LENGTH = 8

let latestQuery = null

const queryCache = {}

const sendGeocodingRequest = async (
    query,
    setPreviousQuery,
    setResult
) => {
    const propagateResult = (result) => {
        setResult(result)
        setPreviousQuery(query)
    }

    const fromCache = queryCache[query]
    if (fromCache) {
        propagateResult(fromCache)

        return
    }

    latestQuery = query

    const response = await freeFormGeocodingRequest(query)

    queryCache[query] = response

    // Account for misordered responses due to network delays.
    if (query !== latestQuery) {
        return
    }

    propagateResult(response)
}

const throttledSendGeocodingRequest = throttle(
    250,
    sendGeocodingRequest
)

const debouncedSendGeocodingRequest = debounce(
    250,
    sendGeocodingRequest
)

const useGeocoding = (initialQuery = '') => {
    const [query, setQuery] = useState(initialQuery)
    const [result, setResult] = useState(null)
    const [previousQuery, setPreviousQuery] = useState(initialQuery)

    const trimAndSetQuery = (rawUserInput) => {
        setQuery(rawUserInput.trim())
    }

    useEffect(
        () => {
            if (query === previousQuery) {
                return
            }

            const { length } = query
            if (length < MIN_QUERY_LENGTH) {
                setResult(null)

                return
            }

            const scheduleGeocodingRequest = () => {
                if (
                    query.endsWith(' ') ||
                    length < DEBOUNCE_THRESHOLD_QUERY_LENGTH
                ) {
                    throttledSendGeocodingRequest(
                        query,
                        setPreviousQuery,
                        setResult
                    )

                    return
                }

                debouncedSendGeocodingRequest(
                    query,
                    setPreviousQuery,
                    setResult
                )
            }

            scheduleGeocodingRequest()
        },
        [query]
    )

    return {
        query,
        result,
        setQuery: trimAndSetQuery
    }
}

export default useGeocoding
