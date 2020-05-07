import React from 'react'
import { render } from 'react-dom'

import ToiletPaperCalculator from
    './ToiletPaperCalculator/ToiletPaperCalculator'

const container = document.getElementById(
    'react-app-container-toilet-paper-calculator'
)

/* eslint-disable-next-line no-unused-expressions */
container ? render(<ToiletPaperCalculator />, container) : false
