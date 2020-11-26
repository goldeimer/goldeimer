import { useEffect, useRef, useState } from 'react'

import { isFunction } from '@goldeimer/js-util'

const useSelectionByIndex = (
    items,
    onSelect = null,
    initialIndex = -1 // set non-negative for pre-selection
) => {
    const selectedRef = useRef()

    const [selectedIndex, setSelectedIndex] = useState(null)

    const returnFocus = () => {
        if (selectedRef.current) {
            selectedRef.current.focus()
        }
    }

    const getSelectedValueFromIndex = (index) => {
        const item = items[index]

        if (!item) {
            return null
        }

        return 'value' in item ? item.value : item
    }

    const { length } = items
    const lastIndex = Math.max(-1, length - 1)

    const setSelectedIndexWithSideEffects = (index) => {
        if (index >= 0 && index <= lastIndex) {
            setSelectedIndex(index)

            const selectedValue = getSelectedValueFromIndex(index)

            if (selectedValue && isFunction(onSelect)) {
                onSelect(selectedValue, returnFocus)
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
        selectedIndex,
        selectedRef,
        setSelectedIndex
    }
}

export default useSelectionByIndex
