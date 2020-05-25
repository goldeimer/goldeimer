import { useBinaryStateWithTriggerEl } from './useBinaryState'

const useHover = (initialState = false) => {
    const {
        handleActivate: handleMouseEnter,
        handleDeactivate: handleMouseLeave,
        state: isHovered,
        ...binaryState
    } = useBinaryStateWithTriggerEl(initialState)

    return {
        ...binaryState,
        bind: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave
        },
        handleMouseEnter,
        handleMouseLeave,
        isHovered
    }
}

export default useHover
