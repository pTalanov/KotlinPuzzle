package util

import js.dom.html5.CanvasContext

fun CanvasContext.fillPath(constructPath: CanvasContext.() -> Unit) {
    beginPath()
    constructPath()
    closePath()
    fill()
}


fun CanvasContext.strokeLine(x1: Int, y1: Int, x2: Int, y2: Int) {
    beginPath()
    moveTo(x1, y1)
    lineTo(x2, y2)
    stroke()
}