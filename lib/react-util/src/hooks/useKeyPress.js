import { useEffect, useState } from 'react'

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

export default useKeyPress
