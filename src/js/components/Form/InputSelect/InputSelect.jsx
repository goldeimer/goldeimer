import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const InputSelect = ({
    options,
    setValue,
    value,
}) => (
    <FormControl>
        <Select
            onChange={(event) => {setValue(event.target.value)}}
            value={value}
        >
            {
                options.map(({label, value}) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                ))
            }
        </Select>
    </FormControl>
);


const valueTypes = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
]).isRequired;

InputSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string,
            value: valueTypes,
        }),
    ).isRequired,
    setValue: PropTypes.func.isRequired,
    value: valueTypes,
};


export default InputSelect;
