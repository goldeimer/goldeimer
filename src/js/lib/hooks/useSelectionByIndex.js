import { useEffect, useState } from 'react'
import { isFunction } from 'typechecker'

const useSelectionByIndex = (
    items,
    onSelect = null,
    initialIndex = -1 // set non-negative for pre-selection
) => {
    const [selectedIndex, setSelectedIndex] = useState(null)

    const getSelectedValueFromIndex = (index) => {
        const item = items[index]

        return 'value' in item ? item.value : item
    }

    const { length } = items
    const lastIndex = Math.max(0, length - 1)

    const setSelectedIndexWithSideEffects = (index) => {
        if (index >= 0 && index <= lastIndex) {
            setSelectedIndex(index)

            const selectedValue = getSelectedValueFromIndex(index)

            if (isFunction(onSelect)) {
                onSelect(selectedValue)
            }

            return selectedValue
        }

        return null
    }

    useEffect(() => {
        if (length > 0) {
            setSelectedIndex(
                Math.min(initialIndex, lastIndex)
            )

            return
        }

        setSelectedIndex(null)
    }, [items, initialIndex, lastIndex, length])

    const handleDecrement = () => setSelectedIndexWithSideEffects(
        Math.max(0, selectedIndex - 1)
    )

    const handleIncrement = () => setSelectedIndexWithSideEffects(
        Math.min(lastIndex, selectedIndex + 1)
    )

    const handleSelect = (index) => setSelectedIndexWithSideEffects(index)

    return {
        handleDecrement,
        handleIncrement,
        handleSelect,
        selectedIndex
    }
}

export default useSelectionByIndex
