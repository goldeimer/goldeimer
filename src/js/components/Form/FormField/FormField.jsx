import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const WrapDiv = styled.div`
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 1rem !important;
`

const LabelDiv = styled.div`
    font-size: 17px;
`

const InputDiv = styled.div`
    display: flex;
`


const FormField = ({
    children,
    label,
}) => (
    <WrapDiv>
        <LabelDiv>
            {label}
        </LabelDiv>
        <InputDiv>
            {children}
        </InputDiv>
    </WrapDiv>
);


FormField.propTypes = {
    children: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
};


export default FormField;
