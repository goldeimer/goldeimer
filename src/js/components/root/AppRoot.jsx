/// Root components for individual applications.
///
/// As
/// Since the material-ui theme might be received from the redux state store,
/// the two respective providers must be nested and cannot reside in the same
/// component.
/// Hence this hierarchy:
/// - `AppRoot` (state and routing)
/// - `ThemeRoot` (mui, favicon, etc.)
/// - `ComponentRoot` (business logic & presentation entry)

import React, { memo } from 'react'

import StateRoot from 'components/root/StateRoot'
import ThemeRoot from 'components/root/ThemeRoot'

// The component directly following the store should always be moized,
// so as to not receive new props on state updates to prevent chained,
// unnecessary re-renders.
const MemoizedThemeRoot = memo(ThemeRoot)

const AppRoot = ({ children, store, ...themeProps }) => (
    <StateRoot store={store}>
        <MemoizedThemeRoot {...themeProps}>
            {children}
        </MemoizedThemeRoot>
    </StateRoot>
)

AppRoot.propTypes = StateRoot.propTypes

export default AppRoot
