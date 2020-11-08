import React from 'react'
import { render } from 'react-dom'

import ToiletPaperCalculator from './ToiletPaperCalculator'

const renderToDom = (
    domElementId = 'app-container-toilet-paper-calculator'
) => {
    const container = document.getElementById(domElementId)

    if (container) {
        render(
            <ToiletPaperCalculator />,
            container
        )
    }
}

export default renderToDom
