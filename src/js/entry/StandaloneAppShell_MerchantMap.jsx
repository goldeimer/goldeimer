import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'

import Map from '@map/Map'

import 'css/fonts.css'

const StandaloneAppShell = () => (
    <div style={{ width: '100vw', height: '100vh' }}>
        <Map />
    </div>
)

render(
    <StandaloneAppShell />,
    document.body.appendChild(
        document.createElement('div')
    )
)
