import { makeStyles } from '@material-ui/core/styles'

const transformGutterDefinitionToSpacing = (
    theme,
    {
        base = 1,
        md = 1,
        lg = 1,
        xl = 1
    }
) => ({
    base: theme.spacing(base),
    md: theme.spacing(md),
    lg: theme.spacing(lg),
    xl: theme.spacing(xl)
})

const useEdgeStyles = ({
    extraSpacing: { height = 0, width = 0 } = {},
    gutterDefiniton = {}
} = {}) => makeStyles((theme) => {
    const positionAbsolute = { position: 'absolute' }
    const gutter = transformGutterDefinitionToSpacing(theme, gutterDefiniton)

    const makeMaximum = (spacing) => ({
        maxHeight: `calc(100vh - ${2 * spacing + height}px)`,
        maxWidth: `calc(100vw - ${2 * spacing + width}px)`,
        fallbacks: {
            maxHeight: '96%',
            maxWidth: '96%'
        }
    })

    const makeEdgePosition = (horizontal, vertical, spacing) => ({
        [horizontal]: spacing,
        [vertical]: spacing,
        ...makeMaximum(spacing)
    })

    const makeEdgePositions = (horizontal, vertical) => ({
        ...positionAbsolute,
        ...makeEdgePosition(horizontal, vertical, gutter.base),
        [theme.breakpoints.up('md')]: makeEdgePosition(
            horizontal,
            vertical,
            gutter.md
        ),
        [theme.breakpoints.up('lg')]: makeEdgePosition(
            horizontal,
            vertical,
            gutter.lg
        ),
        [theme.breakpoints.up('xl')]: makeEdgePosition(
            horizontal,
            vertical,
            gutter.xl
        )
    })

    const makeMaximums = () => ({
        ...makeMaximum(gutter.base),
        [theme.breakpoints.up('md')]: makeMaximum(gutter.md),
        [theme.breakpoints.up('lg')]: makeMaximum(gutter.lg),
        [theme.breakpoints.up('xl')]: makeMaximum(gutter.xl)
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

export {
    useEdgeStyles as default,
    transformGutterDefinitionToSpacing
}
