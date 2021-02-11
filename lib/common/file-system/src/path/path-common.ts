/**
 * File-system path.
 *
 * Type communicates intent / purpose.
 * Path value has not necessarily been resolved / validated.
 *
 * @todo Johannes - Rather than an alias for string, this would be a tagged strong type, ideally.
 */
export type Path = string

/**
 * {@inheritDoc NodeJS.process.cwd}
 */
export const cwd = () => process.cwd()
