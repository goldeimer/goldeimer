import { KEYS, useKeyDown } from '@lib/hooks/useKeyPress'

import useSelectionByIndex from '@lib/hooks/useSelectionByIndex'

const {
    ARROW_DOWN,
    ARROW_UP
} = KEYS

const useSelectionByIndexKeyboardControlled = (...args) => {
    const selectionByIndex = useSelectionByIndex(...args)

    const {
        handleDecrement,
        handleIncrement
    } = selectionByIndex

    useKeyDown(ARROW_UP, handleDecrement)
    useKeyDown(ARROW_DOWN, handleIncrement)

    return selectionByIndex
}

export default useSelectionByIndexKeyboardControlled
