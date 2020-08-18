import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'

import MapRoot from '@goldeimer/map/MapRoot'

const renderToDom = (
    domElementId = 'react-app-container-merchant-map'
) => {
    const container = document.getElementById(domElementId)

    if (container) {
        render(
            <div id='merchant-map-container'>
                <MapRoot />
            </div>,
            container
        )
    }
}

renderToDom()
