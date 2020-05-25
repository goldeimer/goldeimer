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

const useBinaryStateWithTriggerEl = (initialState = false) => {
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

export {
    useBinaryState as default,
    useBinaryStateWithTriggerEl
}
