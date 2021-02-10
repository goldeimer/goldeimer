import { basename, dirname } from 'path'

export const baseDirname = (path: string) => basename(dirname(path))
