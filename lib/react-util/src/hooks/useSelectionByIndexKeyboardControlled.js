import Keyboard from '../enum/Keyboard'

import useKeyDown from './useKeyDown'
import useSelectionByIndex from './useSelectionByIndex'

const useSelectionByIndexKeyboardControlled = (items, ...args) => {
    const selectionByIndex = useSelectionByIndex(items, ...args)

    const {
        handleDecrement,
        handleIncrement
    } = selectionByIndex

    useKeyDown(
        Keyboard.ARROW_UP,
        handleDecrement
    )
    useKeyDown(
        Keyboard.ARROW_DOWN,
        handleIncrement
    )

    return selectionByIndex
}

export default useSelectionByIndexKeyboardControlled
