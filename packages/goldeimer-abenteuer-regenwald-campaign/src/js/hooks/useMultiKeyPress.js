import { useState, useEffect } from 'react'

const useMultiKeyPress = () => {
    const [pressedKeys, setPressedKeys] = useState(new Set([]))

    const handleKeyDown = ({ key }) => {
        setPressedKeys(pressedKeys.add(key))
    }

    const handleKeyUp = ({ key }) => {
        pressedKeys.delete(key)
        setPressedKeys(pressedKeys)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return pressedKeys
}

export default useMultiKeyPress
