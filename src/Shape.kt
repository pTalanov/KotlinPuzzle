package example

abstract class Shape() {
    abstract fun draw(state: CanvasState)
    abstract fun contains(mousePos: Vector): Boolean
    abstract var pos: Vector
    abstract var selected: Boolean
}
