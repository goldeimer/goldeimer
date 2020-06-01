import React, { forwardRef } from 'react'

import { Table as MaterialUiTable } from '@material-ui/core/Table'

import AddBoxIcon from '@material-ui/icons/AddBox'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import CheckIcon from '@material-ui/icons/Check'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ClearIcon from '@material-ui/icons/Clear'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import FilterListIcon from '@material-ui/icons/FilterList'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import RemoveIcon from '@material-ui/icons/Remove'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import SearchIcon from '@material-ui/icons/Search'
import ViewColumnIcon from '@material-ui/icons/ViewColumn'

const makeIcon = (IconComponent) => (props, ref) => (
    <IconComponent {...props} ref={ref} />
)

const tableIcons = {
    Add: forwardRef(makeIcon(AddBoxIcon)),
    Check: forwardRef(makeIcon(CheckIcon)),
    Clear: forwardRef(makeIcon(ClearIcon)),
    Delete: forwardRef(makeIcon(DeleteOutlineIcon)),
    DetailPanel: forwardRef(makeIcon(ChevronRightIcon)),
    Edit: forwardRef(makeIcon(EditIcon)),
    Export: forwardRef(makeIcon(SaveAltIcon)),
    Filter: forwardRef(makeIcon(FilterListIcon)),
    FirstPage: forwardRef(makeIcon(FirstPageIcon)),
    LastPage: forwardRef(makeIcon(LastPageIcon)),
    NextPage: forwardRef(makeIcon(ChevronRightIcon)),
    PreviousPage: forwardRef(makeIcon(ChevronLeftIcon)),
    ResetSearch: forwardRef(makeIcon(ClearIcon)),
    Search: forwardRef(makeIcon(SearchIcon)),
    SortArrow: forwardRef(makeIcon(ArrowDownwardIcon)),
    ThirdStateCheck: forwardRef(makeIcon(RemoveIcon)),
    ViewColumn: forwardRef(makeIcon(ViewColumnIcon))
}

const copy = {
    first: 'Erste Seite',
    last: 'Letzte Seite',
    next: 'Nächste Seite',
    previous: 'Vorherige Seite',
    search: 'Suchen'
}

const Table = (props) => (
    <MaterialUiTable
        icons={tableIcons}
        localization={{
            body: {
                emptyDataSourceMessage: 'Keine Einträge',
                filterRow: {
                    filterTooltip: 'Auswahl einschränken'
                }
            },
            header: {
                actions: 'Aktionen'
            },
            pagination: {
                firstAriaLabel: copy.first,
                firstTooltip: copy.first,
                lastAriaLabel: copy.last,
                lastTooltip: copy.last,
                nextAriaLabel: copy.next,
                nextTooltip: copy.next,
                previousAriaLabel: copy.previous,
                previousTooltip: copy.previous,
                labelDisplayedRows: '{from}-{to} von {count}',
                labelRowsPerPage: 'Einträge pro Seite',
                labelRowsSelect: 'Einträge'
            },
            toolbar: {
                searchPlaceholder: copy.search,
                searchTooltip: copy.search
            }
        }}
        {...props}
    />
)

export default Table
