import { basename, dirname } from 'path'

import type { Path } from './path-common'

export const baseDirname = (path: Path) => basename(dirname(path))
