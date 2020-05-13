const isIos = () => (
    process.browser &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
)

export default isIos
