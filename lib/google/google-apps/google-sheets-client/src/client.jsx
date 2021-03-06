import React from 'react'
import { render } from 'react-dom'

import TableEditor from './components/TableEditor'

window.onload = () => render(
    <TableEditor />,
    document.getElementById('app-mount')
)
