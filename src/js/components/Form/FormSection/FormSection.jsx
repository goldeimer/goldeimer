import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeadlineDiv = styled.div`
    margin-bottom: 20px;
`

const HeadlineH2 = styled.h2`
    margin-bottom: 5px;
`

const FormSection = ({
    children,
    title
}) => (
    <>
        <HeadlineDiv>
            <HeadlineH2>{title}</HeadlineH2>
        </HeadlineDiv>
        {children}
    </>
)

FormSection.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
}

export default FormSection
