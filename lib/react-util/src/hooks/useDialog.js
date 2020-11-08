import { useEffect, useState } from 'react'
import { isFunction } from 'typechecker'

const useDialog = ({
    isOpen: isInitiallyOpen = true,
    onClose = null,
    onOpen = null
}) => {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen)

    useEffect(() => {
        setIsOpen(isInitiallyOpen)
    }, [isInitiallyOpen])

    const handleClose = () => {
        setIsOpen(false)

        if (isFunction(onClose)) {
            onClose()
        }
    }

    const handleOpen = () => {
        setIsOpen(true)

        if (isFunction(onOpen)) {
            onOpen()
        }
    }

    return {
        isOpen,
        setIsOpen,
        handleClose,
        handleOpen
    }
}

export default useDialog
