const makeKeyedListItemToggleReducer = (
    initialState = [],
    resetActionType = 'RESET',
    toggleActionType = 'TOGGLE',
    groupKey = null
) => (state = initialState, action) => {
    if (groupKey && groupKey !== action.groupKey) {
        return state
    }

    switch (action.type) {
    case toggleActionType: {
        const thisItemIndex = state.indexOf(action.key)
        const newSelectedItems = [...state]

        if (thisItemIndex === -1) {
            newSelectedItems.push(action.key)
        } else {
            newSelectedItems.splice(thisItemIndex, 1)
        }

        return newSelectedItems
    }

    case resetActionType:
        return initialState

    default:
        return state
    }
}

export default makeKeyedListItemToggleReducer
