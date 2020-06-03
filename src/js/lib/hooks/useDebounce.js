import { useEffect, useRef } from 'react'
import { isNumber } from 'typechecker'

const useDebounce = (
    callback,
    delay = 100,
    atStart = false,
    guarantee = false
) => {
    const callbackRef = useRef(null)
    const debouncedRef = useRef(null)
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

    useEffect(() => {
        const execute = () => {
            callbackRef.current()
            clear()
            updateReferenceTime()
        }

        const schedule = (timeout) => {
            timeoutIdRef.current = setTimeout(execute, timeout)
        }

        debouncedRef.current = () => {
            const elapsed = Date.now() - referenceTimeRef.current

            if (elapsed > delay && timeoutIdRef.current === null) {
                if (atStart) {
                    execute()
                    return
                }

                updateReferenceTime()
                schedule(delay)
                return
            }

            if (!guarantee) {
                clear()
                schedule(delay)
                return
            }

            const nextGuaranteedExecutionIn = isNumber(guarantee)
                ? guarantee - elapsed
                : delay - elapsed

            const nextExecutionIn = nextGuaranteedExecutionIn > delay
                ? delay
                : nextGuaranteedExecutionIn

            clear()
            schedule(nextExecutionIn)
        }
    }, [delay, atStart, guarantee])

    return [debouncedRef.current, clear]
}

export default useDebounce
