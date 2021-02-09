import {
    PackageJson as PackageJsonSchema
} from 'type-fest'
import { merge } from 'webpack-merge'

import { DefaultConfig } from './DefaultConfig'
import {
    ICompany,
    IPackageConfig,
    IPackageOptions,
    IPerson
} from './interface'

const person = (company: Partial<ICompany>): IPerson => ({
    ...company,
    name: company.legalName || company.shortName
})

export const packageDescription = (
    options: IPackageOptions,
    defaults: IPackageConfig = DefaultConfig
): PackageJsonSchema => {
    const {
        company,
        keywords,
        name,
        support
    } = merge(
        defaults as IPackageOptions,
        options
    )

    return {
        author: person(company),
        bugs: support,
        keywords,
        name
    }
}
