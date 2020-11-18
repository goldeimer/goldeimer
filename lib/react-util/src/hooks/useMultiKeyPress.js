import { useEffect, useState } from 'react'

const useMultiKeyPress = () => {
    const [pressedKeys, setPressedKeys] = useState([])

    useEffect(() => {
        const handleKeyDown = ({ key }) => {
            setPressedKeys([...pressedKeys, key])
        }

        const handleKeyUp = ({ key }) => {
            setPressedKeys(
                pressedKeys.filter((pressedKey) => pressedKey === key)
            )
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [pressedKeys])

    return pressedKeys
}

export default useMultiKeyPress
