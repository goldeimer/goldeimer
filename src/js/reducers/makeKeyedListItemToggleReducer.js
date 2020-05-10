const makeKeyedListItemToggleReducer = (
    initialState = [],
    resetActionType = 'RESET',
    toggleActionType = 'TOGGLE',
    keyName = 'key'
) => (state = initialState, action) => {
    switch (action.type) {
    case toggleActionType: {
        const thisItemIndex = state.indexOf(action[keyName])
        const newSelectedItems = [...state]

        if (thisItemIndex === -1) {
            newSelectedItems.push(action[keyName])
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
