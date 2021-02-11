import { DefaultScopeAndSlug, ScopeAndSlug } from './name-common'
import { nameInfo, NameInfo } from './name-info'

export function extractScopeAndSlug(
    str: string,
    defaults: ScopeAndSlug = DefaultScopeAndSlug
): ScopeAndSlug {
    const nameParts = str.replace(
        /^@/u,
        ''
    ).split('/', 2)

    return {
        slug: nameParts.pop() ?? defaults.slug,
        scope: nameParts.length ? nameParts.pop() : defaults.slug
    }
}

export function extractNameInfo(
    str: string,
    defaults: ScopeAndSlug = DefaultScopeAndSlug
): NameInfo {
    return nameInfo(extractNameInfo(str, defaults))
}
