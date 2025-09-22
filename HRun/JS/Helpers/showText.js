// create maxScore text
const showText = (canvas, text) => {
    const context = canvas.getContext("2d")
    context.strokeStyle = "red"
    context.font = "2.3rem Lucida"
    const w = context.measureText(text).width
    context.strokeText(text, (canvas.width / 2) - (w / 2), canvas.height / 2)
}

export default showText