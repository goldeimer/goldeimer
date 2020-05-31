import { makeStyles } from '@material-ui/core/styles'

const makeEdgeGutterDefinition = (theme) => ({
    default: theme.spacing(1),
    md: theme.spacing(2),
    lg: theme.spacing(3),
    xl: theme.spacing(4)
})

const useViewportEdgeStyles = makeStyles((theme) => {
    const positionAbsolute = { position: 'absolute' }
    const gutter = makeEdgeGutterDefinition(theme)

    const makeEdgePosition = (horizontal, vertical) => ({

        ...positionAbsolute,
        [horizontal]: gutter.default,
        [vertical]: gutter.default,
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
})

export {
    useViewportEdgeStyles as default,
    makeEdgeGutterDefinition
}
