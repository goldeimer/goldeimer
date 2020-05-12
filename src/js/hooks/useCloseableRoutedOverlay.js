import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const useCloseableRoutedOverlay = (
    shouldBeOpen = true,
    routeOnClose = '/'
) => {
    const [isOpen, setIsOpen] = useState(shouldBeOpen)

    const history = useHistory()

    useEffect(() => {
        shouldBeOpen ? handleOpen() : handleClose()
    }, [shouldBeOpen])

    const handleClose = () => {
        setIsOpen(false)

        if (routeOnClose) {
            history.push(routeOnClose)
        }
    }

    const handleOpen = () => {
        setIsOpen(true)
    }

    return {
        isOpen,
        setIsOpen,
        handleClose,
        handleOpen
    }
}

export default useCloseableRoutedOverlay
