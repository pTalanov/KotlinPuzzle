package example

import java.util.ArrayList
import java.util.List
import js.dom.html5.CanvasContext
import util.strokeLine

class Piece(val i: Int, val j: Int,
            startingPos: Vector,
            val imageX: Int, val imageY: Int,
            val width: Int, val height: Int) {
    val shadowOffset = v(- 4.0, 4.0)

    var pos: Vector = startingPos
        get() = if (bundle.selected) $pos else $pos + shadowOffset

    var bundle: Bundle = Bundle(this)


    val leftNeighbour: Piece?
        get() = PuzzleImage[i - 1, j]
    val rightNeighbour: Piece?
        get() = PuzzleImage[i + 1, j]
    val topNeighbour: Piece?
        get() = PuzzleImage[i, j - 1]
    val bottomNeighbour: Piece?
        get() = PuzzleImage[i, j + 1]

    fun contains(mousePos: Vector): Boolean = mousePos.isInRect(pos, v(width.toDouble(), height.toDouble()))

    fun drawBorders(state: CanvasState) {
        val context = state.context
        val leftTop = pos
        val leftBottom = pos + v(0, height)
        val rightTop = pos + v(width, 0)
        val rightBottom = pos + v(width, height)

        context.drawBorder(leftNeighbour, true, leftTop, leftBottom)
        context.drawBorder(rightNeighbour, false, rightTop, rightBottom)
        context.drawBorder(bottomNeighbour, true, leftBottom, rightBottom)
        context.drawBorder(topNeighbour, false, leftTop, rightTop)
    }

    fun CanvasContext.setLineStyleFor(neighbour: Piece?, shadow: Boolean) {
        if (neighbour?.bundle == bundle) {
            strokeStyle = "#FFFFFF"
            lineWidth = 2.0
        } else {
            if (shadow && (bundle == canvasState.selection)) {
                shadowColor = "rgba(100, 100, 100, 0.9)"
                shadowBlur = 4.0
                shadowOffsetX = shadowOffset.x
                shadowOffsetY = shadowOffset.y
            }
            strokeStyle = "#000000"
            lineWidth = 4.0
        }
    }

    fun CanvasContext.drawBorder(neighbour: Piece?, drawShadow: Boolean, p1: Vector, p2: Vector) {
        save()
        setLineStyleFor(neighbour, drawShadow)
        strokeLine(p1.x.toInt(), p1.y.toInt(), p2.x.toInt(), p2.y.toInt())
        restore()
    }


    fun drawImagePart(state: CanvasState) {
        state.context.drawImage(PuzzleImage.data, imageX, imageY, width, height, pos.x.toInt(), pos.y.toInt(), width, height)
    }

    val indexVector: Vector
        get() = v(i, j)

    fun neighbours(): List<Piece?> {
        val result = ArrayList<Piece?>()
        result.add(leftNeighbour)
        result.add(topNeighbour)
        result.add(bottomNeighbour)
        result.add(rightNeighbour)
        return result
    }

    fun alignDelta(otherPiece: Piece): Vector {
        val imageDistance = (otherPiece.indexVector - this.indexVector) * PuzzleImage.pieceSize.toDouble()
        val realDistance = otherPiece.pos - this.$pos
        return realDistance - imageDistance
    }
}
