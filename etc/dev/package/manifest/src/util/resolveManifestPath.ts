/// <reference types="node" />

import path from 'path'

export const resolveManifestPath = (...segments: string[]) => path.resolve(
    ...segments,
    'package.json'
)
