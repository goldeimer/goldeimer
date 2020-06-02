import { throttle } from 'throttle-debounce'

const useThrottle = (...args) => throttle(...args)
const useEvery100Ms = (...args) => useThrottle(100, ...args)

export {
    useThrottle as default,
    useEvery100Ms
}
