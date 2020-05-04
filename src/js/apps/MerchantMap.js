import React from 'react';
import { render } from 'react-dom';

import MerchantMap from 'components/MerchantMap/MerchantMap';


const container = document.getElementById(
    'react-app-container-merchant-map'
);

container ? render(<MerchantMap />, container) : false;
