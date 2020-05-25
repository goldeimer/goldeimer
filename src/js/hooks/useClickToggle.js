import tapOrClick from 'react-tap-or-click'

import { useBinaryStateWithTriggerEl } from './useBinaryState'

const useClickToggle = (initialState = false) => {
    const binaryState = useBinaryStateWithTriggerEl(initialState)

    const bindToggle = tapOrClick(binaryState.handleToggle)

    return {
        ...binaryState,
        bind: bindToggle,
        bindDeactivate: tapOrClick(binaryState.handleDeactivate),
        bindActivate: tapOrClick(binaryState.handleActivate),
        bindToggle
    }
}

export default useClickToggle
