package example

import html5.Context

abstract class Shape() {

    abstract fun draw(state : CanvasState)
    // these two abstract methods defines that our shapes can be dragged
    abstract fun contains(mousePos : Vector) : Boolean
    abstract var pos : Vector

    var selected : Boolean = false

    // a couple of helper extension methods we'll be using in the derived classes
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
}
