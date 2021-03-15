import useBinaryStateWithTrigger from './useBinaryStateWithTrigger'

const useHover = (initialState = false) => {
    const {
        handleActivate: handleMouseEnter,
        handleDeactivate: handleMouseLeave,
        state: isHovered,
        ...binaryState
    } = useBinaryStateWithTrigger(initialState)

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
