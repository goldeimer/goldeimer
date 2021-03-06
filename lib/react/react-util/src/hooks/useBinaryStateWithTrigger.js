import { useState } from 'react'

const useBinaryStateWithTrigger = (initialState = false) => {
    const [state, setState] = useState(initialState)
    const [currentTriggerEl, setCurrentTriggerEl] = useState(null)

    const handleActivate = (event) => {
        setState(true)
        setCurrentTriggerEl(event.currentTarget)
    }

    const handleDeactivate = () => {
        setState(false)
        setCurrentTriggerEl(null)
    }

    const handleToggle = (event) => {
        state ? handleDeactivate() : handleActivate(event)
    }

    return {
        currentTriggerEl,
        handleActivate,
        handleDeactivate,
        handleToggle,
        state
    }
}

export default useBinaryStateWithTrigger
