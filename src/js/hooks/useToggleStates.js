import { useState } from 'react'

const useToggleStates = (initialState = []) => {
    const [activeIds, setActiveIds] = useState(initialState)

    const isActive = (id) => (
        activeIds.includes(id)
    )

    const setActive = (id) => {
        const ids = [...activeIds]
        ids.push(id)
        setActiveIds(ids)
    }

    const setInactive = (idx) => {
        const ids = [...activeIds]
        ids.splice(idx, 1)
        setActiveIds(ids)
    }

    const activate = (id) => {
        if (activeIds.indexOf(id) === -1) {
            setActive(id)
            return true
        }
        return false
    }

    const deactivate = (id) => {
        const idx = activeIds.indexOf(id)
        if (idx > -1) {
            setInactive(idx)
            return true
        }
        return false
    }

    const toggle = (id) => {
        if (!deactivate(id)) {
            activate(id)
        }
    }

    return [
        isActive,
        toggle,
        activate,
        deactivate,
        activeIds
    ]
}

export default useToggleStates
