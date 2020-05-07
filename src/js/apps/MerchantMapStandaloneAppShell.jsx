import React from 'react'
import { render } from 'react-dom'

import MerchantMapStandaloneAppShell from
    './MerchantMap/MerchantMapStandaloneAppShell'

const container = document.getElementById(
    'react-app-container-merchant-map'
)

/* eslint-disable-next-line no-unused-expressions */
container ? render(<MerchantMapStandaloneAppShell />, container) : false
