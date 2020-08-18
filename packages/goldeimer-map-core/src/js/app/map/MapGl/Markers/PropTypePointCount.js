import PropTypes from 'prop-types'

const makePropTypeTaxonomyCount = (taxonomyType) => PropTypes.shape({
    total: PropTypes.number,
    [taxonomyType]: PropTypes.objectOf(PropTypes.number)
})

const PropTypePointCount = PropTypes.shape({
    total: PropTypes.number,
    primary: makePropTypeTaxonomyCount('secondary'),
    secondary: makePropTypeTaxonomyCount('primary')
})

export default PropTypePointCount
