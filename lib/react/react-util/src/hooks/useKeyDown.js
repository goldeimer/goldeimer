import { useEffect, useRef } from 'react'

import { noop } from '@goldeimer/js-util'

const useKeyDown = (
    targetKey,
    onKeyDown,
    isActive = true
) => {
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

export default useKeyDown
