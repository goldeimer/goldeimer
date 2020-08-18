import Enum from 'enum'

import {
    capitalize,
    ensureArray
} from '@lib/util'

const DEFAULT_NAME = 'unknown'

const makeEnum = (
    initializerList,
    name
) => {
    const {
        capitalizationFunctions,
        colors,
        keys,
        key2colorPairs,
        names
    } = initializerList.reduce((acc, item) => {
        const [
            key,
            itemName = null,
            color = null,
            capitalizationFunction = null
        ] = ensureArray(item)

        return {
            capitalizationFunctions: capitalizationFunction
                ? {
                    ...acc.capitalizationFunctions,
                    [key]: capitalizationFunction
                } : acc.capitalizationFunctions,
            colors: color
                ? {
                    ...acc.colors,
                    [key]: color
                } : acc.colors,
            key2colorPairs: color
                ? [
                    ...acc.key2colorPairs,
                    [key, color]
                ]
                : acc.key2colorPairs,
            keys: [
                ...acc.keys,
                key
            ],
            names: itemName
                ? {
                    ...acc.names,
                    [key]: itemName
                } : acc.names
        }
    }, {
        capitalizationFunctions: {},
        colors: {},
        key2colorPairs: [],
        keys: [],
        names: {}
    })

    const enumInstance = new Enum(
        ...keys,
        {
            freeze: true,
            ignoreCase: true,
            name
        }
    )

    const keyToName = (key) => names[key] || key
    const keyToColor = (key) => colors[key] || null
    const keyToCapitalizationFunction = (key) => (
        capitalizationFunctions[key] || capitalize
    )

    // TODO:
    // This turned out too clunky...
    return {
        enum: enumInstance,
        keyToCapitalizationFunction,
        keyToColor,
        key2colorPairs,
        keyToName,
        valueToCapitalizationFunction: (value) => (
            enumInstance.isDefined(value)
                ? keyToCapitalizationFunction(
                    enumInstance.get(value).key
                ) : DEFAULT_NAME
        ),
        valueToColor: (value) => (
            enumInstance.isDefined(value)
                ? keyToColor(enumInstance.get(value).key)
                : null
        ),
        value2colorPairs: key2colorPairs.map(([
            key,
            color
        ]) => ([
            enumInstance.get(key).value(),
            color
        ])),
        valueToName: (value) => (
            enumInstance.isDefined(value)
                ? keyToName(enumInstance.get(value).key)
                : DEFAULT_NAME
        )
    }
}

export default makeEnum
