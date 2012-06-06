package util

import example.Vector
import js.dom.html5.CanvasContext

fun CanvasContext.shadowed(shadowOffset: Vector, alpha: Double, render: CanvasContext.() -> Unit) {
    save()
    shadowColor = "rgba(100, 100, 100, $alpha)"
    shadowBlur = 5.0
    shadowOffsetX = shadowOffset.x
    shadowOffsetY = shadowOffset.y
    render()
    restore()
}

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