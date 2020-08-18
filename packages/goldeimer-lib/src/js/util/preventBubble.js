const preventBubble = (event) => {
    event.preventDefault()
    event.stopPropagation()
}

export default preventBubble
