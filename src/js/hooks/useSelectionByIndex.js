import { useEffect, useState, } from 'react'


const useSelectionByIndex = (
    items,
    onSelect = null,
    initialIndex = 0
) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(
        () => {
            const length = items.length;

            if (length > 0)
            {
                setSelectedIndex(
                    Math.min(initialIndex, length - 1)
                );
                return;
            }

            setSelectedIndex(null);
        },
        [items]
    );

    const handleSelect = (index) =>
    {
        setSelectedIndex(index);

        if (onSelect)
        {
            const item = items[index];
            const selectedValue = 'value' in item ? item.value : item;
            onSelect(selectedValue);
        }
    };
    return {
        handleSelect,
        selectedIndex,
    };
};


export default useSelectionByIndex;
