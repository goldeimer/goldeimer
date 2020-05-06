import { useState } from 'react';
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


export default useCloseableRoutedOverlay;
