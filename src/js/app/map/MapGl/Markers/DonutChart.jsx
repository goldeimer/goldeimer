import React, {
    forwardRef,
    memo,
    useEffect,
    useRef
} from 'react'
import PropTypes from 'prop-types'

import { entries as d3Entries } from 'd3-collection'
import { select as d3Select } from 'd3-selection'
import {
    arc as d3Arc,
    pie as d3Pie
} from 'd3-shape'

import { useTheme } from '@material-ui/core/styles'

const DonutChart = forwardRef(({
    arcWidth: arcWidthProp,
    colorName,
    data,
    keyToColor,
    radius: radiusProp,
    strokeColor: strokeColorProp,
    strokeWidth
}, ref) => {
    const fallbackRef = useRef()
    const svgRef = ref || fallbackRef

    const { palette, spacing } = useTheme()

    const arcWidth = arcWidthProp || spacing(1)
    const radius = (radiusProp || spacing(2.5)) - strokeWidth
    const strokeColor = strokeColorProp || palette.background.paper

    const diameter = radius * 2

    const arcClassName = 'donut-arc'
    useEffect(() => {
        const draw = () => {
            const pie = d3Pie()
                .value((d) => d.value)
                .sort((a, b) => (a.key > b.key ? 1 : -1))
            const pieData = pie(
                d3Entries(data)
                    .filter(({ value }) => value > 0)
            )

            d3Select(svgRef.current)
                .select('g')
                .selectAll(arcClassName)
                .data(pieData)
                .enter()
                .append('path')
                .attr(
                    'd',
                    d3Arc().innerRadius(radius - arcWidth)
                        .outerRadius(radius)
                )
                .attr(
                    'fill',
                    (d) => keyToColor(d.data.key)[colorName]
                )
                .attr('stroke', strokeColor)
                .style('stroke-width', `${strokeWidth}px`)
        }

        draw()
    }, [
        arcWidth,
        colorName,
        data,
        keyToColor,
        palette,
        radius,
        svgRef,
        strokeColor,
        strokeWidth
    ])

    return (
        <svg
            ref={svgRef}
            width={diameter}
            height={diameter}
            style={{ display: 'block' }}
        >
            <g
                transform={`translate(${radius},${radius})`}
            />
        </svg>
    )
})

DonutChart.propTypes = {
    arcWidth: PropTypes.number,
    colorName: PropTypes.string,
    data: PropTypes.objectOf(PropTypes.number).isRequired,
    keyToColor: PropTypes.func.isRequired,
    radius: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number
}

DonutChart.defaultProps = {
    arcWidth: null,
    colorName: 'main',
    radius: null,
    strokeColor: null,
    strokeWidth: 2
}

export default memo(DonutChart)
