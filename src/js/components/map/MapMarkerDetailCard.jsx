import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const MapMarkerDetailCard = ({
    placeName
    // id
}) => {
    useEffect(() => {
        // data = getMapMarkerDetails(id)
        // useMapMarkerDetails(id) ?
    }, [])

    return (
        <Card>
            <CardContent>
                <Typography
                    variant='h6'
                    component='h3'
                >
                    {placeName}
                </Typography>
            </CardContent>
        </Card>
    )
}

MapMarkerDetailCard.propTypes = {
    placeName: PropTypes.string.isRequired
    // id: PropTypes.string.isRequired
}

export default MapMarkerDetailCard
