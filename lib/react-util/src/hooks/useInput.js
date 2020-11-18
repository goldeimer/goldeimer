import { useState } from 'react'

const setValueByEvent = (
    event,
    setValue,
    evenTargetKey = 'value'
) => {
    setValue(
        event.target[evenTargetKey]
    )
}

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue)

    return {
        bind: {
            value,
            onChange: (event) => setValueByEvent(event, setValue)
        },
        reset: () => setValue(initialValue),
        setValue,
        value
    }
}

export default useInput
