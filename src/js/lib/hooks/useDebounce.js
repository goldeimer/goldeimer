import { debounce } from 'throttle-debounce'

const useDebounce = (...args) => debounce(...args)

export default useDebounce
