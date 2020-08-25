import { useState, useEffect } from 'react'

const KEYS = {
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ENTER: 'Enter'
}

const useKeyPress = (targetKey) => {
    const [isKeyPressed, setIsKeyPressed] = useState(false)

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

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return isKeyPressed
}

const useKeyDown = (targetKey, onKeyDown) => {
    const isKeyPressed = useKeyPress(targetKey)

    useEffect(() => {
        if (isKeyPressed) {
            onKeyDown()
        }
    }, [isKeyPressed])
}

export {
    useKeyPress as default,
    useKeyDown,
    KEYS
}
