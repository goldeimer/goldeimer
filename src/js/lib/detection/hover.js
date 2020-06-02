const detectHover = () => {
    window.USER_CAN_HOVER = false

    const onFirstHover = () => {
        window.USER_CAN_HOVER = true
        window.removeEventListener(
            'mouseover',
            onFirstHover,
            false
        )
    }

    window.addEventListener(
        'mouseover',
        onFirstHover,
        false
    )
}

export default detectHover
