import {
    DeliveryServiceIcon,
    EcommerceIcon,
    PointOfInterestIcon,
    RetailIcon,
    GoldeimerIcon,
    VivaConAguaIcon,
    WholesaleIcon
} from '../icon'

const getTermIcon = (iconId) => {
    switch (iconId) {
    case 'DeliveryServiceIcon':
        return DeliveryServiceIcon
    case 'EcommerceIcon':
        return EcommerceIcon
    case 'GoldeimerIcon':
        return GoldeimerIcon
    case 'RetailIcon':
        return RetailIcon
    case 'VivaConAguaIcon':
        return VivaConAguaIcon
    case 'WholesaleIcon':
        return WholesaleIcon
    default:
        return PointOfInterestIcon
    }
}

export default getTermIcon
