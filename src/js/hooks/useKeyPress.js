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

    useEffect(() => {
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
    }, [targetKey, setIsKeyPressed])

    return isKeyPressed
}

const useKeyDown = (targetKey, onKeyDown) => {
    const isKeyPressed = useKeyPress(targetKey)

    useEffect(() => {
        if (isKeyPressed) {
            onKeyDown()
        }
    }, [isKeyPressed, onKeyDown])
}

export {
    useKeyPress as default,
    useKeyDown,
    KEYS
}
