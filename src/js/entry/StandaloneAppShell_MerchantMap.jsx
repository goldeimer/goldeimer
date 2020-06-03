import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'

import App from '@app/App'

import 'css/fonts.css'

const StandaloneAppShell = () => (
    <div style={{ width: '100vw', height: '100vh' }}>
        <App />
    </div>
)

render(
    <StandaloneAppShell />,
    document.body.appendChild(
        document.createElement('div')
    )
)
