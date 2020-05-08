import React from 'react'
import { render } from 'react-dom'

import MerchantMap from 'apps/MerchantMap/MerchantMap'

import 'css/fonts.css'
import 'css/reset.css'

const StandaloneAppShell = () => (
    <div style={{ width: '100vw', height: '100vh' }}>
        <MerchantMap />
    </div>
)

render(
    <StandaloneAppShell />,
    document.body.appendChild(
        document.createElement('div')
    )
)
