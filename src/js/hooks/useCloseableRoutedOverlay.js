import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';


const useCloseableRoutedOverlay = (
    isOpenInitially = true,
    routeOnClose = '/'
) => {
    const [isOpen, setIsOpen] = useState(isOpenInitially);

    const history = useHistory();

    const handleClose = () =>
    {
        setIsOpen(false);

        if (routeOnClose)
        {
            history.push(routeOnClose);
        }
    };

    const handleOpen = () =>
    {
        setIsOpen(true);
    };

    return [
        isOpen,
        setIsOpen,
        handleClose,
        handleOpen,
    ];
};


const closeableRoutedOverlayPropTypes = {
    children: PropTypes.node.isRequired,
    isOpenInitially: PropTypes.bool,
    routeOnClose: PropTypes.string,
};


export {
    useCloseableRoutedOverlay as default,
    closeableRoutedOverlayPropTypes
};
