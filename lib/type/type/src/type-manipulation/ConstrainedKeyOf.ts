// Extracts keys assignable to TargetType
export type ConstrainedKeyOf<Type, TargetType> = Extract<keyof Type, TargetType>

export type StringKeyOf<Type> = ConstrainedKeyOf<Type, string>
