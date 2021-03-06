import * as z from 'zod'

export const isNumericString = (
    value: string
): boolean => !isNaN(Number(value))

export const zStringOrNumber = z.union([z.number(), z.string()])

export const zNumericString = z.string().refine(isNumericString)

export const zNumeric = z.union([z.number(), zNumericString])
