import useDebounce from './useDebounce'

const useThrottle = (callback, delay = 100) => useDebounce(
    callback,
    delay,
    true,
    true
)

export default useThrottle
