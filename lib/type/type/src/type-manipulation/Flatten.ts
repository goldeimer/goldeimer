// Flatten the type output to improve type hints shown in editors.
export type Flatten<Type> = {[Key in keyof Type]: Type[Key]}
