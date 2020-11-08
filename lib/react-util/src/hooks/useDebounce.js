import { useEffect, useRef } from 'react'
import { isNumber } from 'typechecker'

const useDebounce = (
    callback,
    delay = 100,
    atStart = false,
    guarantee = false
) => {
    const callbackRef = useRef(null)
    const referenceTimeRef = useRef(0)
    const timeoutIdRef = useRef(null)

    const clear = () => {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
    }

    const updateReferenceTime = () => { referenceTimeRef.current = Date.now() }

    useEffect(() => {
        callbackRef.current = callback
    })

    const execute = (args) => {
        if (callbackRef.current) {
            callbackRef.current(...args)
        }
        clear()
        updateReferenceTime()
    }

    const schedule = (timeout, args) => {
        timeoutIdRef.current = setTimeout(() => execute(args), timeout)
    }

    const debouncedCallback = (...args) => {
        const elapsed = Date.now() - referenceTimeRef.current

        if (elapsed > delay && timeoutIdRef.current === null) {
            if (atStart) {
                execute(args)
                return
            }

            updateReferenceTime()
            schedule(delay, args)
            return
        }

        if (!guarantee) {
            clear()
            schedule(delay, args)
            return
        }

        const nextGuaranteedExecutionIn = isNumber(guarantee)
            ? guarantee - elapsed
            : delay - elapsed

        const nextExecutionIn = nextGuaranteedExecutionIn > delay
            ? delay
            : nextGuaranteedExecutionIn

        clear()
        schedule(nextExecutionIn, args)
    }

    return [debouncedCallback, clear]
}

export default useDebounce
