import { KEYS, useKeyDown } from 'hooks/useKeyPress'

import useSelectionByIndex from 'hooks/useSelectionByIndex'

const AXES = {
    horizontal: 'horizontal',
    vertical: 'vertical'
}

const {
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    ARROW_UP
} = KEYS

const useSelectionByIndexKeyboardControlled = (
    axes,
    ...args
) => {
    const selectionByIndex = useSelectionByIndex(...args)

    const {
        handleDecrement,
        handleIncrement
    } = selectionByIndex

    if (axes.includes(AXES.horizontal)) {
        useKeyDown(ARROW_LEFT, handleDecrement)
        useKeyDown(ARROW_RIGHT, handleIncrement)
    }

    if (axes.includes(AXES.vertical)) {
        useKeyDown(ARROW_UP, handleDecrement)
        useKeyDown(ARROW_DOWN, handleIncrement)
    }

    return selectionByIndex
}

export {
    useSelectionByIndexKeyboardControlled as default,
    AXES
}
