const detectIos = () => (
    process.browser &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
)

export default detectIos
