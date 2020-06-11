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

const useViewportEdgeStyles = (gutterDefiniton = {}) => makeStyles((theme) => {
    const positionAbsolute = { position: 'absolute' }
    const gutter = transformGutterDefinitionToSpacing(theme, gutterDefiniton)

    const makeEdgePosition = (horizontal, vertical) => ({
        ...positionAbsolute,
        [horizontal]: gutter.base,
        [vertical]: gutter.base,
        [theme.breakpoints.up('md')]: {
            [horizontal]: gutter.md,
            [vertical]: gutter.md
        },
        [theme.breakpoints.up('lg')]: {
            [horizontal]: gutter.lg,
            [vertical]: gutter.lg
        },
        [theme.breakpoints.up('xl')]: {
            [horizontal]: gutter.xl,
            [vertical]: gutter.xl
        }
    })

    return {
        positionAbsolute,
        topLeft: makeEdgePosition('top', 'left'),
        topRight: makeEdgePosition('top', 'right'),
        bottomLeft: makeEdgePosition('bottom', 'left'),
        bottomRight: makeEdgePosition('bottom', 'right')
    }
})()

export {
    useViewportEdgeStyles as default,
    transformGutterDefinitionToSpacing
}
