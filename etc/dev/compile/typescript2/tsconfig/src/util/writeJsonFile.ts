import { writeFileSync } from 'fs'
import path from 'path'

import { JsonObject } from 'type-fest'

export type IndentSizes = 1 | 2 | 4 | 6 | 8

// TODO(Johannes):
// Ideally, read from `.editorconfig`.
const DefaultIndentSize = 4

export const writeJsonFile = (jsonObject: JsonObject = {}, {
    filePath = 'filename.json',
    indentSize = DefaultIndentSize
}: {
    // TODO(Johannes): Use some dedicated path type.
    filePath?: string,
    indentSize?: IndentSizes
} = {}) => {
    try {
        writeFileSync(
            path.resolve(filePath),
            `${JSON.stringify(jsonObject, null, 4)}\n`
        )
    } catch (err) {
        console.error(err)
    }
}
