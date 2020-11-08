const SLUG = 'default-package'

const DEFAULTS = {
    org: {
        descriptionPrefix: 'Goldeimer\'s',
        descriptionSeparator: ' ',
        scope: '@goldeimer',
        shortName: 'Goldeimer',
        slug: 'goldeimer'
    },
    pkg: {
        contributors: {},
        description: 'default package',
        engines: {
            node: '>=10.0.0',
            yarn: '>=1.0.0'
        },
        keywords: ['goldeimer'],
        mainFields: [],
        os: ['darwin', 'freebsd', 'linux', 'openbsd', 'win32'],
        private: true,
        pkgSlug: SLUG,
        subType: null,
        type: 'package',
        version: '0.0.1'
    },
    repo: {
        bugsUrl: null,
        email: 'bugs@goldeimer.de',
        pkgRelpath: `packages/${SLUG}`,
        uri: 'https://github.com/Goldeimer/goldeimer'
    }
}

export default DEFAULTS
