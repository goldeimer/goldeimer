import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const WrapDiv = styled.div`
    margin-top: 40px;
    padding: 30px;
    background-color: #ffe300;
    text-align: center;
`;

const MainDiv = styled.div`
    font-size: 2em;
    line-height: 1.8em;
    color: #000000;
    font-family: veneer;
    text-align: center;
`;

const MainSpan = styled.div`
    display: block;
    font-size: 2em;
`;

const FootnoteP = styled.p`
    margin-top: 20px;
    font-family: "Museo", sans serif !important;
    font-weight: 700 !important;
    font-size: 12px !important;
    text-align: center;
`;


const ToiletPaperCalculatorResult = ({requiredRolls}) =>
(
    <WrapDiv>
        <MainDiv>
            Du brauchst
            <MainSpan>
                {requiredRolls} Rollen
            </MainSpan>
            Goldeimer Klopapier!*
            <br />
        </MainDiv>
        <FootnoteP>
            *Nicht mit eingerechnet ist der zusätzliche Verbrauch von Klopapier, während der Periode. Je nach Intensität solltest Du etwas mehr Klopapier einkalkulieren!
        </FootnoteP>
    </WrapDiv>
);


ToiletPaperCalculatorResult.propTypes = {
    requiredRolls: PropTypes.number.isRequired,
}


export default ToiletPaperCalculatorResult;
