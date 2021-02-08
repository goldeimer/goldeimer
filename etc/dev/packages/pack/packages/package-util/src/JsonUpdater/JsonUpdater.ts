
import editJsonFile from 'edit-json-file'
import type {
    JsonObject,
    PackageJson as PackageJsonSchema
} from 'type-fest'

export class NotImplementedError extends Error {}

export const enum OnUnexpected {
    Error,
    Ignore,
    Overwrite,
    Remove
}

export interface IJsonEditorOptions {
    autosave?: boolean,
    eolAtEndOfFile?: boolean,
    expandObjectPaths?: boolean,
    indentWidth?: number,
    stringifyFn?: (value: JsonObject) => string
}

export interface IJsonEditor {
    get: (key?: string) => JsonObject,
    save: () => void,
    set: (key: string, value: JsonObject) => void
}

export class JsonEditor implements IJsonEditor {
    protected _editor: ReturnType<editJsonFile>

    constructor(
        public path: string,
        public options: IJsonEditorOptions = {}
    ) {
        this.__init()
    }

    get(key?: string): JsonObject {
        return this._editor.get(key)
    }

    open(
        path: string,
        saveCurrent: boolean = true
    ) {
        saveCurrent && this.save()
        this.path = path
        this.__init()
    }

    save() {
        this._editor.save()
    }

    set(key: string, value: JsonObject) {
        this._editor.set(key, value)
    }

    private __init() {
        this._editor = jsonEditor(
            this.path,
            this.options
        )
    }
}

export const jsonEditor = (
    path: string,
    options?: IJsonEditorOptions
) => new JsonEditor(path, options)

export interface IPackageUpdateOptions extends IJsonEditorOptions {}

export class JsonUpdater<
    Schema,
    ValueType = Partial<Schema>,
    // OnAdditionalKeys extends OnUnexpected = OnUnexpected.Ignore,
    // OnEmpty extends OnUnexpected = OnUnexpected.Remove,
    // OnExisting extends OnUnexpected = OnUnexpected.Overwrite,
    // OnUndefined extends OnUnexpected = OnUnexpected.Remove
> extends JsonEditor {
    public constructor(
        path: string,
        options: IJsonEditorOptions = {}
    ) {
        super(path, options)
    }

    public static jsonUpdater<Schema_>(path: string) {
        return new JsonUpdater<Schema_>(path)
    }

    public update(values: ValueType) {
        Object.entries(values).forEach(([
            key,
            value
        ]: [string, JsonObject]) => this._editor.set(key, value))
    }

    // handle<
    //     UnexpectedEvent extends OnUnexpected
    // >(): EnableIfNotExtends<UnexpectedEvent, OnUnexpected.Ignore> {
    //     throw NotImplementedError
    // }
}

export const jsonUpdater = JsonUpdater.jsonUpdater
