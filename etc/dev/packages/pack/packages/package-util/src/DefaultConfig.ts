import {
    Keywords
} from './enum'

import {
    IPackageConfig
} from './interface'

export const DefaultConfig: IPackageConfig = {
    company: {
        email: 'post@goldeimer.de',
        legalName: 'Goldeimer gemeinnützige GmbH',
        shortName: 'Goldeimer'
    },
    contributors: [],
    keywords: [Keywords.Default],
    support: {
        email: 'engineering+bugs@goldeimer.de',
        url: 'https://github.com/goldeimer/goldeimer/issues'
    }
}
