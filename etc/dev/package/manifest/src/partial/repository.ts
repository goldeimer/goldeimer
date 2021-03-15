import type { Path }  from '../_import-stubs'

import type { PackageJson }  from '../schema'

// TODO(Johannes):
// smth. along the lines of:
// ```
// kind: RepositoryKind // (currently fixed to:  git)
// remoteHost: RepositoryRemoteHost // (currently fixed to: github)
// ```
export type RepositoryInfo = {
    name: string,
    owner: string
}

export type RepositoryFieldsArgs = [
    info: RepositoryInfo,
    relpath: Path
]

export type RepositoryFields = Pick<PackageJson,
    | 'bugs'
    | 'homepage'
    | 'repository'
>

export const repositoryFields = (...[
    { name, owner },
    relpath
]: RepositoryFieldsArgs) => {
    const baseUrl = `https://github.com/${owner}/${name}`

    return {
        bugs: {
            url: `${baseUrl}/issues`
        },
        homepage: `${baseUrl}/${relpath}#readme`,
        repository: {
            directory: relpath,
            type: 'git',
            url: `git+${baseUrl}.git`
        }
    } as RepositoryFields
}
