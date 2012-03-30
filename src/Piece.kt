package example


class Piece(val i : Int, val j : Int,
        val imageX : Int, val imageY : Int,
        val width : Int, val height : Int) : Shape() {
    override var pos : Vector = v(0.0, 0.0)

    override fun contains(mousePos : Vector) : Boolean = mousePos.isInRect(pos, v(width.toDouble(), height.toDouble()))

    override fun draw(state : CanvasState) {
        state.context.drawImage(Image.data, imageX, imageY, width, height, pos.x.toInt(), pos.y.toInt(), width, height)
    }
}