import { staticAssertType } from '../static-assert'

staticAssertType<string>('')
staticAssertType<string>('a')
staticAssertType<string>('A')
staticAssertType<string>('0')
staticAssertType<string>('1')
staticAssertType<string>('42')
staticAssertType<string>('1337e0')
staticAssertType<string>('false')
staticAssertType<string>('true')

staticAssertType<number>(0)
staticAssertType<number>(1)
staticAssertType<number>(42)
staticAssertType<number>(1337e0)
staticAssertType<number>(-0)
staticAssertType<number>(-1)
staticAssertType<number>(-42)
staticAssertType<number>(-1337e0)

staticAssertType<boolean>(false)
staticAssertType<boolean>(true)

staticAssertType<symbol>(Symbol.iterator)
staticAssertType<symbol>(Symbol.for('something'))
staticAssertType<symbol>(Symbol())

staticAssertType<string[]>([])
staticAssertType<string[]>([''])
staticAssertType<string[]>(['0'])
staticAssertType<string[]>(['false'])
staticAssertType<string[]>(['1'])
staticAssertType<string[]>(['true'])
staticAssertType<string[]>(['', ''])
staticAssertType<string[]>(['a', 'a'])
staticAssertType<string[]>(['A', 'A'])

staticAssertType<number[]>([])
staticAssertType<number[]>([0])
staticAssertType<number[]>([1])
staticAssertType<number[]>([42])
staticAssertType<number[]>([1337e0])
staticAssertType<number[]>([0, 0, 0])
staticAssertType<number[]>([0, 42, 1337e0])
staticAssertType<number[]>([-0])
staticAssertType<number[]>([-1])
staticAssertType<number[]>([-42])
staticAssertType<number[]>([-1337e0])
staticAssertType<number[]>([-0, 0, -0])
staticAssertType<number[]>([-0, 42, -1337e0])

staticAssertType<
    [-0, 42, -1337e0]
>(
    [-0, 42, -1337e0]
)
staticAssertType<
    ['A', 'B', 'C']
>(
    ['A', 'B', 'C']
)
staticAssertType<
    [-0, 42, -1337e0, 'A', 'B', 'C']
>(
    [-0, 42, -1337e0, 'A', 'B', 'C']
)

// @ts-expect-error
staticAssertType()

// @ts-expect-error
staticAssertType<string>()
// @ts-expect-error
staticAssertType<string>(0)
// @ts-expect-error
staticAssertType<string>(1)
// @ts-expect-error
staticAssertType<string>(42)
// @ts-expect-error
staticAssertType<string>(1337e0)
// @ts-expect-error
staticAssertType<string>(-0)
// @ts-expect-error
staticAssertType<string>(-1)
// @ts-expect-error
staticAssertType<string>(-42)
// @ts-expect-error
staticAssertType<string>(-1337e0)
// @ts-expect-error
staticAssertType<string>(false)
// @ts-expect-error
staticAssertType<string>(true)
// @ts-expect-error
staticAssertType<string>(Symbol.iterator)
// @ts-expect-error
staticAssertType<string>(Symbol.for('something'))
// @ts-expect-error
staticAssertType<string>(Symbol())
// @ts-expect-error
staticAssertType<string>([])
// @ts-expect-error
staticAssertType<string>([''])
// @ts-expect-error
staticAssertType<string>(['', ''])
// @ts-expect-error
staticAssertType<string>(['a', 'a'])
// @ts-expect-error
staticAssertType<string>(['A', 'A'])

// @ts-expect-error
staticAssertType<number>()
// @ts-expect-error
staticAssertType<number>('')
// @ts-expect-error
staticAssertType<number>('0')
// @ts-expect-error
staticAssertType<number>('1')
// @ts-expect-error
staticAssertType<number>('42')
// @ts-expect-error
staticAssertType<number>('1337e0')
// @ts-expect-error
staticAssertType<number>('false')
// @ts-expect-error
staticAssertType<number>('true')
// @ts-expect-error
staticAssertType<number>(false)
// @ts-expect-error
staticAssertType<number>(true)
// @ts-expect-error
staticAssertType<number>(Symbol.iterator)
// @ts-expect-error
staticAssertType<number>(Symbol.for('something'))
// @ts-expect-error
staticAssertType<number>(Symbol())
// @ts-expect-error
staticAssertType<number>([])
// @ts-expect-error
staticAssertType<number>([''])
// @ts-expect-error
staticAssertType<number>(['', ''])
// @ts-expect-error
staticAssertType<number>(['a', 'a'])
// @ts-expect-error
staticAssertType<number>(['A', 'A'])

// @ts-expect-error
staticAssertType<boolean>()
// @ts-expect-error
staticAssertType<boolean>('')
// @ts-expect-error
staticAssertType<boolean>('0')
// @ts-expect-error
staticAssertType<boolean>('1')
// @ts-expect-error
staticAssertType<boolean>('42')
// @ts-expect-error
staticAssertType<boolean>('1337e0')
// @ts-expect-error
staticAssertType<boolean>('false')
// @ts-expect-error
staticAssertType<boolean>('true')
// @ts-expect-error
staticAssertType<boolean>()
// @ts-expect-error
staticAssertType<boolean>(0)
// @ts-expect-error
staticAssertType<boolean>(1)
// @ts-expect-error
staticAssertType<boolean>(42)
// @ts-expect-error
staticAssertType<boolean>(1337e0)
// @ts-expect-error
staticAssertType<boolean>(-0)
// @ts-expect-error
staticAssertType<boolean>(-1)
// @ts-expect-error
staticAssertType<boolean>(-42)
// @ts-expect-error
staticAssertType<boolean>(-1337e0)
// @ts-expect-error
staticAssertType<boolean>(Symbol.iterator)
// @ts-expect-error
staticAssertType<boolean>(Symbol.for('something'))
// @ts-expect-error
staticAssertType<boolean>(Symbol())
// @ts-expect-error
staticAssertType<boolean>([])
// @ts-expect-error
staticAssertType<boolean>([''])
// @ts-expect-error
staticAssertType<boolean>(['', ''])
// @ts-expect-error
staticAssertType<boolean>(['a', 'a'])
// @ts-expect-error
staticAssertType<boolean>(['A', 'A'])


// @ts-expect-error
staticAssertType<symbol>()
// @ts-expect-error
staticAssertType<symbol>('')
// @ts-expect-error
staticAssertType<symbol>('0')
// @ts-expect-error
staticAssertType<symbol>('1')
// @ts-expect-error
staticAssertType<symbol>('42')
// @ts-expect-error
staticAssertType<symbol>('1337e0')
// @ts-expect-error
staticAssertType<symbol>('false')
// @ts-expect-error
staticAssertType<symbol>('true')
// @ts-expect-error
staticAssertType<symbol>()
// @ts-expect-error
staticAssertType<symbol>(0)
// @ts-expect-error
staticAssertType<symbol>(1)
// @ts-expect-error
staticAssertType<symbol>(42)
// @ts-expect-error
staticAssertType<symbol>(1337e0)
// @ts-expect-error
staticAssertType<symbol>(-0)
// @ts-expect-error
staticAssertType<symbol>(-1)
// @ts-expect-error
staticAssertType<symbol>(-42)
// @ts-expect-error
staticAssertType<symbol>(-1337e0)
// @ts-expect-error
staticAssertType<symbol>(false)
// @ts-expect-error
staticAssertType<symbol>(true)
// @ts-expect-error
staticAssertType<symbol>([])
// @ts-expect-error
staticAssertType<symbol>([''])
// @ts-expect-error
staticAssertType<symbol>(['', ''])
// @ts-expect-error
staticAssertType<symbol>(['a', 'a'])
// @ts-expect-error
staticAssertType<symbol>(['A', 'A'])

// @ts-expect-error
staticAssertType<string[]>()
// @ts-expect-error
staticAssertType<string[]>('')
// @ts-expect-error
staticAssertType<string[]>('0')
// @ts-expect-error
staticAssertType<string[]>('1')
// @ts-expect-error
staticAssertType<string[]>('42')
// @ts-expect-error
staticAssertType<string[]>('1337e0')
// @ts-expect-error
staticAssertType<string[]>('false')
// @ts-expect-error
staticAssertType<string[]>('true')
// @ts-expect-error
staticAssertType<string[]>()
// @ts-expect-error
staticAssertType<string[]>(0)
// @ts-expect-error
staticAssertType<string[]>(1)
// @ts-expect-error
staticAssertType<string[]>(42)
// @ts-expect-error
staticAssertType<string[]>(1337e0)
// @ts-expect-error
staticAssertType<string[]>(-0)
// @ts-expect-error
staticAssertType<string[]>(-1)
// @ts-expect-error
staticAssertType<string[]>(-42)
// @ts-expect-error
staticAssertType<string[]>(-1337e0)
// @ts-expect-error
staticAssertType<string[]>(false)
// @ts-expect-error
staticAssertType<string[]>(true)
// @ts-expect-error
staticAssertType<string[]>(Symbol.iterator)
// @ts-expect-error
staticAssertType<string[]>(Symbol.for('something'))
// @ts-expect-error
staticAssertType<string[]>(Symbol())
// @ts-expect-error
staticAssertType<string[]>([0])
// @ts-expect-error
staticAssertType<string[]>([1])
// @ts-expect-error
staticAssertType<string[]>([0, 1])
// @ts-expect-error
staticAssertType<string[]>([0, 'string'])
// @ts-expect-error
staticAssertType<string[]>(['string', 0])

// @ts-expect-error
staticAssertType<number[]>()
// @ts-expect-error
staticAssertType<number[]>('')
// @ts-expect-error
staticAssertType<number[]>('0')
// @ts-expect-error
staticAssertType<number[]>('1')
// @ts-expect-error
staticAssertType<number[]>('42')
// @ts-expect-error
staticAssertType<number[]>('1337e0')
// @ts-expect-error
staticAssertType<number[]>('false')
// @ts-expect-error
staticAssertType<number[]>('true')
// @ts-expect-error
staticAssertType<number[]>()
// @ts-expect-error
staticAssertType<number[]>(0)
// @ts-expect-error
staticAssertType<number[]>(1)
// @ts-expect-error
staticAssertType<number[]>(42)
// @ts-expect-error
staticAssertType<number[]>(1337e0)
// @ts-expect-error
staticAssertType<number[]>(-0)
// @ts-expect-error
staticAssertType<number[]>(-1)
// @ts-expect-error
staticAssertType<number[]>(-42)
// @ts-expect-error
staticAssertType<number[]>(-1337e0)
// @ts-expect-error
staticAssertType<number[]>(false)
// @ts-expect-error
staticAssertType<number[]>(true)
// @ts-expect-error
staticAssertType<number[]>(Symbol.iterator)
// @ts-expect-error
staticAssertType<number[]>(Symbol.for('something'))
// @ts-expect-error
staticAssertType<number[]>(Symbol())
// @ts-expect-error
staticAssertType<number[]>(['0'])
// @ts-expect-error
staticAssertType<number[]>(['1'])
// @ts-expect-error
staticAssertType<number[]>(['0', '1'])
// @ts-expect-error
staticAssertType<number[]>(['0', 0])
// @ts-expect-error
staticAssertType<number[]>([0, '0'])
// @ts-expect-error
staticAssertType<number[]>([false, 0])
// @ts-expect-error
staticAssertType<number[]>([0, false])

staticAssertType<
    [-0, 42]
>(
    // @ts-expect-error
    [-0, 42, -1337e0]
)

staticAssertType<
    ['A', 'B', 'C']
>(
    // @ts-expect-error
    ['A', 'B']
)

staticAssertType<
    [-0, 42, -1337e0, 'A', 'B', 'C']
>(
    // @ts-expect-error
    []
)

staticAssertType<
    []
>(
    // @ts-expect-error
    [0]
)

staticAssertType<
    [0]
>(
    // @ts-expect-error
    []
)

staticAssertType<
    []
>(
    // @ts-expect-error
    [false]
)

staticAssertType<
    [false]
>(
    // @ts-expect-error
    []
)

staticAssertType<
    [true]
>(
    // @ts-expect-error
    [false]
)
