import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { RESOURCES_SAVED_PER_ROLL } from '../../toilet-paper-calculator-config'

const WrapDiv = styled.div`
    margin-top: 40px;
    padding: 30px;
    background-color: #ffe300;
    text-align: center;
`

const MainDiv = styled.div`
    font-size: 2em;
    line-height: 1.8em;
    color: #000000;
    font-family: veneer;
    text-align: center;
`

const MainSpan = styled.div`
    display: block;
    font-size: 2em;
`

const BaseP = styled.p`
    margin-top: 20px;
    font-family: "Museo", sans serif !important;
    font-weight: 700 !important;
    font-size: 12px !important;
    text-align: center;
`

const FootnoteP = styled(BaseP)`
    font-size: 12px !important;
`

const SubscriptionP = styled(BaseP)`
    font-size: 17px !important;
`

const SubscriptionA = styled.a`
    display: inline-block;

    height: auto !important;
    width: auto !important;
    margin: 13px 0;
    padding: 15px 30px 13px;
    font-family: "Museo", sans-serif;
    letter-spacing: 2px;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase !important;
    background-color: transparent !important;
    color: #000 !important;
    border: #000 solid 2px !important;
    border-radius: 0px !important;
    transition: 0.3s;

    &:hover {
        opacity: 1 !important;
        background-color: #000 !important;
        color: #FFF !important;
    }
`

const ToiletPaperCalculatorResult = ({
    bestFittingSubscription,
    requiredRollsPerSelectedPeriod
}) => {
    const resourcesSaved = Object.fromEntries(
        Object.entries(RESOURCES_SAVED_PER_ROLL).map(
            ([key, perRollValue]) => (
                [
                    key,
                    (perRollValue * requiredRollsPerSelectedPeriod).toFixed(1)
                ]
            )
        )
    )

    return (
        <WrapDiv>
            <MainDiv>
                Du brauchst
                <MainSpan>
                    {requiredRollsPerSelectedPeriod}
                    {' '}
                    Rollen
                </MainSpan>
                Goldeimer Klopapier!*
                <br />
            </MainDiv>
            <SubscriptionP>
                Das für dich passendste
                <a href={bestFittingSubscription.url}>Klopapier-Abo</a>
                sind
                {' '}
                {bestFittingSubscription.packages}
                {' '}
                Pakete
                {` ${bestFittingSubscription.perPeriodCopy}`}
                .
            </SubscriptionP>
            <SubscriptionA href={bestFittingSubscription.url}>
                Jetzt abonnieren
            </SubscriptionA>
            <SubscriptionP>
                {'Gegenüber herrkömmlichen Klopapier auf Frischholzbasis '}
                sparst du im gewählten Zeitraum**:
                <br />
                {`${resourcesSaved.electricalEnergyInKwh} kWh elektrische Energie`}
                <br />
                {`${resourcesSaved.freshWoodInKg} kg Frischholz`}
                <br />
                {`${resourcesSaved.waterInLiter} Liter Wasser`}
            </SubscriptionP>
            <FootnoteP>
                *Nicht mit eingerechnet ist der zusätzliche Verbrauch von
                Klopapier während der Periode. Je nach Intensität solltest Du
                etwas mehr Klopapier einkalkulieren!
            </FootnoteP>
            <FootnoteP>
                **Das mag für den einzelnen Haushalt eventuell nach gar nicht
                so viel klingen, aber wenn mensch bedenkt, dass etwa 50
                Millionen Menschen nur in Deutschland täglich Klopapier aus
                Frischholz verwenden, nehmen die Ergebnisse erstaunliche
                Dimensionen an.
            </FootnoteP>
        </WrapDiv>
    )
}

ToiletPaperCalculatorResult.propTypes = {
    bestFittingSubscription: PropTypes.shape({
        // months: PropTypes.number,
        packages: PropTypes.number,
        perPeriodCopy: PropTypes.string,
        // rollsPerMonth: PropTypes.number,
        url: PropTypes.string
    }).isRequired,
    requiredRollsPerSelectedPeriod: PropTypes.number.isRequired
}

export default ToiletPaperCalculatorResult
