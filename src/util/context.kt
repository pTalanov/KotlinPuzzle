package util

import example.Vector
import html5.Context

fun Context.shadowed(shadowOffset : Vector, alpha : Double, render : Context.() -> Unit) {
    save()
    shadowColor = "rgba(100, 100, 100, $alpha)"
    shadowBlur = 5.0
    shadowOffsetX = shadowOffset.x
    shadowOffsetY = shadowOffset.y
    render()
    restore()
}

fun Context.fillPath(constructPath : Context.() -> Unit) {
    beginPath()
    constructPath()
    closePath()
    fill()
}


fun Context.strokeLine(x1 : Int, y1 : Int, x2 : Int, y2 : Int) {
    beginPath()
    moveTo(x1, y1)
    lineTo(x2, y2)
    stroke()
}

fun Context.drawing(f : Context.()->Unit) {
    f()
}