import { useSelector } from 'react-redux'
import { WebMercatorViewport } from 'react-map-gl'

import { selectViewState } from './selectView'

// WIP!
// Will be extremely inefficient like this.
const useWebMercatorViewport = () => {
    const viewState = useSelector(selectViewState)

    return new WebMercatorViewport(viewState)
}

export default useWebMercatorViewport
