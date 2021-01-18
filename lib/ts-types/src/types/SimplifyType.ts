// Flatten the type output to improve type hints shown in editors.
export type SimplifyType<Type> = {[KeyType in keyof Type]: Type[KeyType]};
