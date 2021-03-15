const identity = (arg) => arg

const noop = () => {}

const no = () => false
const yes = () => true

export {
    noop as default,
    identity,
    noop,
    no,
    yes
}
