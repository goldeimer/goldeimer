import { LiteralUnion } from 'type-fest'

export type TypescriptVersion42 = 4.2
export type TypescriptVersion41 = LiteralUnion<4.1, TypescriptVersion42>
export type TypescriptVersion40 = LiteralUnion<4.0, TypescriptVersion41>
export type TypescriptVersion39 = LiteralUnion<3.9, TypescriptVersion40>
export type TypescriptVersion38 = LiteralUnion<3.8, TypescriptVersion39>
export type TypescriptVersion37 = LiteralUnion<3.7, TypescriptVersion38>
export type ValidTypescriptVersions = TypescriptVersion37
