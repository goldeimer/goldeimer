import React from 'react';
import { render } from 'react-dom';

import MerchantMapStandaloneAppShell from
    'components/MerchantMap/MerchantMapStandaloneAppShell';


const container = document.getElementById(
    'react-app-container-merchant-map'
);

container ? render(<MerchantMapStandaloneAppShell />, container) : false;
