import {
    useEffect,
    useState
} from 'react'

import { useHistory } from 'react-router-dom'

const useRoutedDialog = ({
    isOpen: isInitiallyOpen = true,
    // onClose = null,
    // onOpen = null,
    routeOnClose = '/'
}) => {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen)

    const history = useHistory()

    useEffect(() => {
        setIsOpen(isInitiallyOpen)
    }, [isInitiallyOpen])

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

export default useRoutedDialog
