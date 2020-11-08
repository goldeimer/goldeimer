import { useState } from 'react'

const useBinaryState = (initialState = false) => {
    const [state, setState] = useState(initialState)

    const handleActivate = () => {
        setState(true)
    }

    const handleDeactivate = () => {
        setState(false)
    }

    const handleToggle = () => {
        setState(!state)
    }

    return {
        handleActivate,
        handleDeactivate,
        handleToggle,
        state
    }
}

export default useBinaryState
