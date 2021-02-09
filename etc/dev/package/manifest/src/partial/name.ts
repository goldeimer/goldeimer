import type { PackageId }  from '../_import-stubs'

export const name = ({
    scope,
    slug
}: PackageId) => `@${scope}/${slug}`
