import React from 'react'
import { render } from 'react-dom'

import Map from '@map/Map'

const renderToDom = (
    domElementId = 'react-app-container-merchant-map'
) => {
    const container = document.getElementById(domElementId)

    if (container) {
        render(
            <div id="merchant-map-container">
                <Map />
            </div>,
            container
        )
    }
}

renderToDom()
