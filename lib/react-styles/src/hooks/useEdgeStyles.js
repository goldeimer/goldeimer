import { makeStyles } from '@material-ui/core/styles'

const useEdgeStyles = ({
    extraSpacing: { height = 0, width = 0 } = {},
    gutterDefiniton = {}
} = {}) => makeStyles(({ breakpoints, spacing }) => {
    const positionAbsolute = { position: 'absolute' }
    const gutter = spacing(1)

    const makeMaximum = () => ({
        maxHeight: `calc(100vh - ${2 * spacing + height}px)`,
        maxWidth: `calc(100vw - ${2 * spacing + width}px)`,
        fallbacks: {
            maxHeight: '96%',
            maxWidth: '96%'
        }
    })

    const makeEdgePosition = (horizontal, vertical) => ({
        [horizontal]: spacing,
        [vertical]: spacing,
        ...makeMaximum(spacing)
    })

    const makeEdgePositions = (horizontal, vertical) => ({
        ...positionAbsolute,
        ...makeEdgePosition(horizontal, vertical, gutter.base),
        [breakpoints.up('md')]: makeEdgePosition(
            horizontal,
            vertical,
            gutter.md
        ),
        [breakpoints.up('lg')]: makeEdgePosition(
            horizontal,
            vertical,
            gutter.lg
        ),
        [breakpoints.up('xl')]: makeEdgePosition(
            horizontal,
            vertical,
            gutter.xl
        )
    })

    const makeMaximums = () => ({
        ...makeMaximum(gutter.base),
        [breakpoints.up('md')]: makeMaximum(gutter.md),
        [breakpoints.up('lg')]: makeMaximum(gutter.lg),
        [breakpoints.up('xl')]: makeMaximum(gutter.xl)
    })

    return {
        positionAbsolute,
        maximums: makeMaximums(),
        topLeft: makeEdgePositions('top', 'left'),
        topRight: makeEdgePositions('top', 'right'),
        bottomLeft: makeEdgePositions('bottom', 'left'),
        bottomRight: makeEdgePositions('bottom', 'right')
    }
})()

export default useEdgeStyles
