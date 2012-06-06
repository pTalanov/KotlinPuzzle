package example

abstract class Shape() {

    abstract fun draw(state: CanvasState)
    // these two abstract methods defines that our shapes can be dragged
    abstract fun contains(mousePos: Vector): Boolean
    abstract var pos: Vector
    open var selected: Boolean = false
}
