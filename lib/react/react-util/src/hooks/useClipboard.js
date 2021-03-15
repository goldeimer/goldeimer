import { useRef } from 'react'

const useClipboard = () => {
    const textareaRef = useRef()

    const copyTextFallback = async (text) => {
        if (!textareaRef.current) {
            // error
        }

        textareaRef.current.value = text

        let wasSuccessful = true
        try {
            wasSuccessful = document.execCommand('copy')
        } catch (_) {
            wasSuccessful = false
        }

        textareaRef.current.value = ''

        if (!wasSuccessful) {
            return new Promise().resolve()
        }

        return new Promise().reject()
    }

    const copyText = async (text) => {
        await navigator.clipboard.writeText(text)
    }

    return {
        copyText: navigator.clipboard ? copyText : copyTextFallback,
        textareaRef
    }
}

export default useClipboard
