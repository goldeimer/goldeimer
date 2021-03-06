type NonNullableDeep<Type> = {
    [Key in keyof Type]?: NonNullableDeep<Type[Key]>
};