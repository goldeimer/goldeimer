import { Keyboard } from '../enum/Keyboard'

import useKeyDown from './useKeyDown'
import useSelectionByIndex from './useSelectionByIndex'

const useSelectionByIndexKeyboardControlled = (items, ...args) => {
    const selectionByIndex = useSelectionByIndex(items, ...args)

    const {
        handleDecrement,
        handleIncrement
    } = selectionByIndex

    useKeyDown(
        Keyboard.ArrowUp,
        handleDecrement
    )
    useKeyDown(
        Keyboard.ArrowDown,
        handleIncrement
    )

    return selectionByIndex
}

export default useSelectionByIndexKeyboardControlled
