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
        get() = if (i > 0) PuzzleImage.pieces[i - 1][j] else null
    val rightNeighbour: Piece?
        get() = if (i < PuzzleImage.piecesX - 1) PuzzleImage.pieces[i + 1][j] else null
    val topNeighbour: Piece?
        get() = if (j > 0) PuzzleImage.pieces[i][j - 1] else null
    val bottomNeighbour: Piece?
        get() = if (j < PuzzleImage.piecesY - 1) PuzzleImage.pieces[i][j + 1] else null

    fun contains(mousePos: Vector): Boolean = mousePos.isInRect(pos, v(width.toDouble(), height.toDouble()))

    fun drawBorders(state: CanvasState) {
        val context = state.context
        context.drawBorder(leftNeighbour, true) {
            strokeLine(pos.x.toInt(), pos.y.toInt(), pos.x.toInt(), pos.y.toInt() + height)
        }

        context.drawBorder(rightNeighbour, false) {
            strokeLine(pos.x.toInt() + width, pos.y.toInt(), pos.x.toInt() + width, pos.y.toInt() + height)
        }

        context.drawBorder(bottomNeighbour, true) {
            strokeLine(pos.x.toInt(), pos.y.toInt() + height, pos.x.toInt() + width, pos.y.toInt() + height)
        }

        context.drawBorder(topNeighbour, false) {
            strokeLine(pos.x.toInt(), pos.y.toInt(), pos.x.toInt() + width, pos.y.toInt())
        }
    }

    fun CanvasContext.setLineStyleFor(neighbour: Piece?, shadow: Boolean) {
        if (neighbour?.bundle == bundle) {
            strokeStyle = "#FFFFFF"
            lineWidth = 2.0
        } else {
            if (shadow and (bundle == canvasState.selection)) {
                shadowColor = "rgba(100, 100, 100, 0.9)"
                shadowBlur = 4.0
                shadowOffsetX = shadowOffset.x
                shadowOffsetY = shadowOffset.y
            }
            strokeStyle = "#000000"
            lineWidth = 4.0
        }
    }

    fun CanvasContext.drawBorder(neighbour: Piece?, drawShadow: Boolean, drawLine: CanvasContext.() -> Unit) {
        save()
        setLineStyleFor(neighbour, drawShadow)
        drawLine()
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
