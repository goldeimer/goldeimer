import { KEYS, useKeyDown } from 'hooks/useKeyPress'

import useSelectionByIndex from 'hooks/useSelectionByIndex'

const {
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    ARROW_UP,
    ENTER
} = KEYS

const useSelectionByIndexKeyboardControlled = (...args) => {
    const selectionByIndex = useSelectionByIndex(...args)

    const {
        handleDecrement,
        handleIncrement,
        handleSubmit
    } = selectionByIndex

    useKeyDown(ARROW_DOWN, handleIncrement)
    useKeyDown(ARROW_RIGHT, handleIncrement)
    useKeyDown(ARROW_UP, handleDecrement)
    useKeyDown(ARROW_LEFT, handleDecrement)
    useKeyDown(ENTER, handleSubmit)

    return selectionByIndex
}

export default useSelectionByIndexKeyboardControlled
