import { useEffect, useRef, useState } from 'react'

import noop from '@lib/util/noop'

const KEYS = {
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ENTER: 'Enter'
}

const useKeyDown = (targetKey, onKeyDown, isActive = true) => {
    const callbackRef = useRef(null)

    useEffect(() => {
        callbackRef.current = onKeyDown
    })

    useEffect(() => {
        if (!isActive) {
            return noop
        }

        const handleKeyDown = ({ key }) => {
            if (key === targetKey) {
                callbackRef.current()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isActive, targetKey])
}

const useKeyPress = (targetKey, isActive = true) => {
    const [isKeyPressed, setIsKeyPressed] = useState(false)

    useEffect(() => {
        if (!isActive) {
            setIsKeyPressed(false)
        }

        const handleKeyDown = ({ key }) => {
            if (key === targetKey) {
                setIsKeyPressed(true)
            }
        }

        const handleKeyUp = ({ key }) => {
            if (key === targetKey) {
                setIsKeyPressed(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [isActive, targetKey])

    return isKeyPressed
}

export {
    useKeyPress as default,
    useKeyDown,
    KEYS
}
