import { useCallbackOne as useCallback } from 'use-memo-one'

import useDebounce from '@lib/hooks/useDebounce'
import useThrottle from '@lib/hooks/useThrottle'

// TODO: Think about this, this doesn't look right.
const useDebouncedCallback = (...args) => useCallback(useDebounce(...args))
const useThrottledCallback = (...args) => useCallback(useThrottle(...args))

export {
    useCallback as default,
    useDebounce,
    useDebouncedCallback,
    useThrottle,
    useThrottledCallback
}
