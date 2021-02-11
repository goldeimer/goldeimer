import type { Path } from '../path'

import { readFile } from './readFile'
import { writeFile } from './writeFile'

export type C = string  // dummy
export class File {
// export class File implements IFile<C> {
    private _string: string | undefined

    private constructor(
        private readonly _buffer: ReturnType<typeof readFile>,
        private readonly _path: Path
    ) {
    }

    static load(path: Path) {
        return new File(
            readFile(path),
            path
        )
    }

    static save(path: Path, content: C) {
        writeFile(path, content)

        return File.load(path)
    }

    static toString(buffer: Buffer) {
        return buffer.toString('utf8')
    }

    get buffer() {
        return this._buffer
    }

    get path() {
        return this._path
    }

    get string() {
        if (!this._string) {
            this._string = File.toString(this.buffer)

        }

        return this._string
    }

    get content(): C {
        return '' as C
    }

    save(
        content: C,
        path: Path = this.path
    ) {
        return File.save(path, content)
    }
}

export const file = (path: Path): File => File.load(path)
