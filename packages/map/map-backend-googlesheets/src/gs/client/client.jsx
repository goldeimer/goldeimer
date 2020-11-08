import React from 'react'
import { render } from 'react-dom'

import TableEditor from '@gs/client/components/TableEditor'

window.onload = () => render(
    <TableEditor />,
    document.getElementById('app-mount')
)
