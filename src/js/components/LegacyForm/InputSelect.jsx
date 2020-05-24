import React from 'react'
import PropTypes from 'prop-types'

import uuid from 'react-uuid'

import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const InputSelect = ({
    options,
    setValue,
    value
}) => (
    <FormControl>
        <Select
            onChange={(event) => { setValue(event.target.value) }}
            value={value}
        >
            {
                options.map(({ label, value: optionValue }) => (
                    <MenuItem key={uuid()} value={optionValue}>
                        {label}
                    </MenuItem>
                ))
            }
        </Select>
    </FormControl>
)

const valueTypes = PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
])

InputSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string.isRequired,
            value: valueTypes.isRequired
        })
    ).isRequired,
    setValue: PropTypes.func.isRequired,
    value: valueTypes.isRequired
}

export default InputSelect
