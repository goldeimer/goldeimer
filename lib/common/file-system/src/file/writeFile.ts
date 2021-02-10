/// <reference types="node" />

import { writeFileSync } from 'fs'

export type Path = string
export type FileContent = string

export const writeFile = (path: Path, content: string) => {
    writeFileSync(path, content)
}
