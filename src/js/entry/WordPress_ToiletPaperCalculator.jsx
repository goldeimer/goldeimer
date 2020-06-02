import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'

import ToiletPaperCalculator from '@tpc/ToiletPaperCalculator'

const renderToDom = (
    domElementId = 'react-app-container-toilet-paper-calculator'
) => {
    const container = document.getElementById(domElementId)

    if (container) {
        render(
            <ToiletPaperCalculator />,
            container
        )
    }
}

renderToDom()
