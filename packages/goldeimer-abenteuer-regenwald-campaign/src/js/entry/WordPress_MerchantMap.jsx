import React from 'react'
import { render } from 'react-dom'

import MerchantMap from 'apps/MerchantMap/MerchantMap'

const renderToDom = (
    domElementId = 'react-app-container-merchant-map'
) => {
    const container = document.getElementById(domElementId)

    if (container) {
        render(
            <div id="merchant-map-container">
                <MerchantMap />
            </div>,
            container
        )
    }
}

renderToDom()
