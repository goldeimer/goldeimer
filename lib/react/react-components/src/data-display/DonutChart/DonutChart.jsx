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

const DonutChart = ({
    arcWidth: arcWidthProp,
    colorName,
    data,
    keyToColor,
    padding,
    radius: radiusProp,
    strokeColor: strokeColorProp,
    strokeWidth
}, ref) => {
    const fallbackRef = useRef()
    const svgRef = ref || fallbackRef

    const { palette, spacing } = useTheme()

    const arcWidth = arcWidthProp || spacing(1)
    const radius = radiusProp || spacing(2.5)
    const strokeColor = strokeColorProp || palette.background.paper

    const svgDimension = (radius + spacing(padding)) * 2

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
            width={svgDimension}
            height={svgDimension}
            viewBox={`0 0 ${svgDimension} ${svgDimension}`}
            style={{ display: 'block', position: 'relative' }}
        >
            <g
                transform={`translate(${svgDimension / 2}, ${svgDimension / 2})`}
                style={{ strokeOpacity: 0.8, strokeWidth: `${strokeWidth}px` }}
            />
        </svg>
    )
}

DonutChart.propTypes = {
    arcWidth: PropTypes.number,
    colorName: PropTypes.string,
    data: PropTypes.objectOf(PropTypes.number).isRequired,
    keyToColor: PropTypes.func.isRequired,
    padding: PropTypes.number,
    radius: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number
}

DonutChart.defaultProps = {
    arcWidth: null,
    colorName: 'main',
    padding: 2,
    radius: null,
    strokeColor: null,
    strokeWidth: 2
}

export default memo(forwardRef(DonutChart))
