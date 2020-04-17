import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ThemeProvider } from '@material-ui/core/styles';

import muiTheme from 'js/muiTheme';

import FormField from
       'components/Form/FormField/FormField';

import FormSection from
       'components/Form/FormSection/FormSection';

import InputIntegerPlusMinus from
       'components/Form/InputIntegerPlusMinus/InputIntegerPlusMinus';

import InputSelect from
       'components/Form/InputSelect/InputSelect';

import ToiletPaperCalculatorResult from
       './ToiletPaperCalculatorResult/ToiletPaperCalculatorResult';


const Form = styled.form`
    margin: 0 auto;
    width: 100%;
    color: #444;
    font-weight: bold;
`;


const DAYS_PER_WEEK = 7;
const PIECES_PER_ROLL = 150;


const ToiletPaperCalculator = () =>
{
    const [form, setFormValues] = useState({
        dailyPissCount: 0,
        dailyShitCount: 0,
        personsInHousehold: 0,
        piecesPerPiss: 0,
        piecesPerWipe: 0,
        weeksInQuarantine: 1,
        wipesPerShit: 0,
    });

    const [requiredRolls, setRequiredRolls] = useState(0);

    const {
        dailyPissCount,
        dailyShitCount,
        personsInHousehold,
        piecesPerPiss,
        piecesPerWipe,
        weeksInQuarantine,
        wipesPerShit,
    } = form;

    const setValue = (key, value) =>
    {
        setFormValues({
            ...form,
            [key]: value,
        });
    };

    const calculateRequiredRolls = () =>
    {
        const piecesPerPersonPerDay = (
            dailyShitCount * wipesPerShit * piecesPerWipe
            + dailyPissCount * piecesPerPiss
        );

        return Math.ceil(
            piecesPerPersonPerDay * weeksInQuarantine * DAYS_PER_WEEK
            / PIECES_PER_ROLL
        );
    };

    useEffect(
        () => {
            setRequiredRolls(calculateRequiredRolls())
        },
        [form]
    )

    return (
        <ThemeProvider theme={muiTheme}>
            <Form formName="shitcalcForm">
                <FormSection
                    title='Haushalt'
                >
                    <FormField label='Personen im Haushalt'>
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('personsInHousehold', value)
                            }
                            value={personsInHousehold}
                        />
                    </FormField>
                </FormSection>
                <FormSection
                    title='Großes Geschäft'
                >
                    <FormField label='Große Geschäfte am Tag pro Person'>
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('dailyShitCount', value)
                            }
                            value={dailyShitCount}
                        />
                    </FormField>
                    <FormField label='Abwischer pro Geschäft'>
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('wipesPerShit', value)
                            }
                            value={wipesPerShit}
                        />
                    </FormField>
                    <FormField label='Blatt pro Abwischer'>
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('piecesPerWipe', value)
                            }
                            value={piecesPerWipe}
                        />
                    </FormField>
                </FormSection>
                <FormSection
                    title='Kleines Geschäft'
                >
                    <FormField label='Kleine Geschäfte am Tag pro Person'>
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('dailyPissCount', value)
                            }
                            value={dailyPissCount}
                        />
                    </FormField>
                    <FormField label='Blatt pro Geschäft'>
                        <InputIntegerPlusMinus
                            setValue={
                                (value) => setValue('piecesPerPiss', value)
                            }
                            value={piecesPerPiss}
                        />
                    </FormField>
                </FormSection>
                <FormSection
                    title='Quarantäne'
                >
                    <FormField label='Zeitraum in Quarantäne'>
                        <InputSelect
                            options={
                                [
                                    {label: 'Eine Woche', value: 1},
                                    {label: 'Zwei Wochen', value: 2},
                                    {label: 'Drei Wochen', value: 3},
                                    {label: 'Vier Wochen', value: 4},
                                ]
                            }
                            setValue={
                                (value) => setValue('weeksInQuarantine', value)
                            }
                            value={weeksInQuarantine}
                        />
                    </FormField>
                </FormSection>
            </Form>
            <ToiletPaperCalculatorResult
                requiredRolls={requiredRolls}
            />
        </ThemeProvider>
    );
}


export default ToiletPaperCalculator;
