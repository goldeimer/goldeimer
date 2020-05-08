import React from 'react'
import { render } from 'react-dom'

import MerchantMap from 'apps/MerchantMap/MerchantMap'

import 'css/fonts.css'

const StandaloneAppShell = () => (
    <div style={{ width: '100vw', height: '100vh' }}>
        <MerchantMap />
    </div>
)

const renderToDom = (
    domElementId = 'react-app-container-merchant-map'
) => {
    const container = document.getElementById(domElementId)

    if (container) {
        render(
            <StandaloneAppShell />,
            container
        )
    }
}

renderToDom()
