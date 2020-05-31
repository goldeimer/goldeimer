import React from 'react'
import PropTypes from 'prop-types'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

const StateRoot = ({ children, store }) => (
    <ReduxProvider store={store}>
        <Router>
            {children}
        </Router>
    </ReduxProvider>
)

StateRoot.propTypes = {
    children: PropTypes.node.isRequired,
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired
    }).isRequired
}

export default StateRoot
