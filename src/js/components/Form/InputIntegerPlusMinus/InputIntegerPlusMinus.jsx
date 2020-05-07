import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputTypeNumber = styled.input.attrs((props) => ({
    type: 'number'
}))`
    width: 4rem !important;
    margin-bottom: 0px !important;
    padding: 1rem 1rem !important;
    border: none !important;
    background-color: #f8f8f8 !important;
    font-size: 1em;
    text-align: center !important;

    &:focus {
        outline: 3px solid #ffea00 !important;
    }

    &:invalid {
        outline: 3px solid #ff1a00 !important;
    }

    -moz-appearance: textfield !important;

    &::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
        margin: 0 !important;
    }

    &::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0 !important;
    }
`

const ButtonDiv = styled.div`
    margin: 0 1rem !important;
    padding: .5rem 1rem !important;
    background-color: #f8f8f8 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all ease-in-out .25s !important;

    &:last-child {
        margin-right: 0 !important;
    }

    &:hover {
        cursor: pointer !important;
        background-color: #ffea00 !important;
    }

    &:focus {
        outline: 3px solid #444 !important;
    }
`

const InputIntegerPlusMinus = ({
    minValue,
    maxValue,
    setValue,
    step,
    value
}) => {
    const setValueWithinBounds = (newValue) => {
        setValue(
            Math.max(
                minValue,
                maxValue === null
                    ? newValue
                    : Math.min(maxValue, newValue)
            )
        )
    }

    const handleChange = (event) => {
        const newValue = event.target.value

        if (!Number.isNaN(newValue)) {
            setValueWithinBounds(newValue)
        }
    }

    const handleMinus = () => {
        setValueWithinBounds(value - step)
    }

    const handlePlus = () => {
        setValueWithinBounds(value + step)
    }

    return (
        <>
            <ButtonDiv onClick={handleMinus}>
                -
            </ButtonDiv>
            <InputTypeNumber value={value} onChange={handleChange} />
            <ButtonDiv onClick={handlePlus}>
                +
            </ButtonDiv>
        </>
    )
}

InputIntegerPlusMinus.propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    setValue: PropTypes.func.isRequired,
    step: PropTypes.number,
    value: PropTypes.number
}

InputIntegerPlusMinus.defaultProps = {
    minValue: 0,
    maxValue: null,
    step: 1,
    value: 0
}

export default InputIntegerPlusMinus
