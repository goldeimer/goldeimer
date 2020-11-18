import React from 'react'
import PropTypes from 'prop-types'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'

const StateRoot = ({ children, persistor, store }) => (
    <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                {children}
            </Router>
        </PersistGate>
    </ReduxProvider>
)

StateRoot.propTypes = {
    children: PropTypes.node.isRequired,
    persistor: PropTypes.shape({
        pause: PropTypes.func,
        persist: PropTypes.func,
        purge: PropTypes.func,
        flush: PropTypes.func,
        dispatch: PropTypes.func,
        getState: PropTypes.func,
        replaceReducer: PropTypes.func,
        subscribe: PropTypes.func
    }),
    store: PropTypes.shape({
        subscribe: PropTypes.func,
        dispatch: PropTypes.func,
        getState: PropTypes.func
    }).isRequired
}

StateRoot.defaultProps = {
    persistor: null
}

export default StateRoot
