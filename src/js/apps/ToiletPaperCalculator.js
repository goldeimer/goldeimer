import React from 'react';
import { render } from 'react-dom'

import ToiletPaperCalculator from
       'components/ToiletPaperCalculator/ToiletPaperCalculator';


const container = document.getElementById(
    'react-app-container-toilet-paper-calculator'
);

container ? render(<ToiletPaperCalculator />, container) : false;
