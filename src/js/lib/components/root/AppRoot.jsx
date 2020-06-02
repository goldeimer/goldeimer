/// Root components for individual applications.
///
/// Intended hierarchy:
/// - `StateRoot` (state and routing)
/// - `ThemeRoot` (mui, favicon, etc.)
/// - `ComponentRoot` (business logic & presentation entry)

import React, { memo } from 'react'

import StateRoot from '@lib/components/root/StateRoot'
import ThemeRoot from '@lib/components/root/ThemeRoot'

// The component directly following the store should always be memoized,
// so as to not repeatedly receive faux new props on global state updates.
// Meant to prevent unnecessary re-renders of the entire component tree.
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
