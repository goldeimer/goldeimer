import { useState } from 'react'


const useInput = (
    initialValue = '',
    evenTargetKey = 'value'
) => {
    const [value, setValue] = useState(initialValue);

    const setValueByEvent = (event) => {
        setValue(
            event.target[evenTargetKey]
        );
    };

    return {
        bind: {
            value,
            onChange: setValueByEvent,
        },
        reset: () => setValue(initialValue),
        setValue,
        setValueByEvent,
        value,
    };
}


export default useInput;
