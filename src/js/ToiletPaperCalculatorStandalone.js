import React from 'react';
import ReactDOM from 'react-dom'

import ToiletPaperCalculator from
       'components/ToiletPaperCalculator/ToiletPaperCalculator';


const container = document.getElementById(
    "react-app-container-toilet-paper-calculator"
);

container ? ReactDOM.render(<ToiletPaperCalculator />, container) : false;
