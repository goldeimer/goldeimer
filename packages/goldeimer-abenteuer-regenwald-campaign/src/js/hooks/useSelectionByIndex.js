import { useEffect, useState } from 'react'

import isFunction from 'util/isFunction'

const LOWER_BOUND = 0

const useSelectionByIndex = (
    items,
    onSubmit = null,
    onSelect = null,
    initialIndex = 0
) => {
    const [selectedIndex, setSelectedIndex] = useState(null)

    const getSelectedValueFromIndex = (index) => {
        const item = items[index]

        return 'value' in item ? item.value : item
    }

    const setSelectedIndexWithSideEffects = (index) => {
        setSelectedIndex(index)

        if (isFunction(onSelect)) {
            onSelect(getSelectedValueFromIndex(index))
        }
    }

    const { length } = items
    const lastIndex = Math.max(LOWER_BOUND, length - 1)

    useEffect(() => {
        if (length > 0) {
            setSelectedIndex(
                Math.min(initialIndex, lastIndex)
            )

            return
        }

        setSelectedIndex(null)
    }, [items])

    const handleDecrement = () => {
        setSelectedIndexWithSideEffects(
            Math.max(LOWER_BOUND, selectedIndex - 1)
        )
    }

    const handleIncrement = () => {
        setSelectedIndexWithSideEffects(
            Math.min(lastIndex, selectedIndex + 1)
        )
    }

    const handleSelect = (index) => {
        setSelectedIndexWithSideEffects(index)
    }

    const handleSubmit = (index = selectedIndex) => {
        setSelectedIndex(index)

        if (isFunction(onSubmit)) {
            onSubmit(getSelectedValueFromIndex(index))
        }
    }

    return {
        handleDecrement,
        handleIncrement,
        handleSelect,
        handleSubmit,
        selectedIndex
    }
}

export default useSelectionByIndex
