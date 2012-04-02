package example

import java.util.ArrayList
import java.util.List

class Piece(val i : Int, val j : Int,
            startingPos : Vector,
            val imageX : Int, val imageY : Int,
            val width : Int, val height : Int) : Shape() {
    override var pos : Vector = startingPos
    var bundle : Bundle = Bundle(this)
    override fun contains(mousePos : Vector) : Boolean = mousePos.isInRect(pos, v(width.toDouble(), height.toDouble()))

    override fun draw(state : CanvasState) {
        drawImagePart(state)
        drawBorders(state)
    }

    fun drawBorders(state : CanvasState) {
        val context = state.context
        context.strokeStyle = "#000000"
        context.lineWidth = 2.0
        context.strokeRect(pos.x.toInt(), pos.y.toInt(), width, height)
    }

    fun drawImagePart(state : CanvasState) {
        state.context.shadowed(v(1.0, 1.0), 0.8) {
            drawImage(Image.data, imageX, imageY, width, height, pos.x.toInt(), pos.y.toInt(), width, height)
        }
    }

    val indexVector : Vector
    get() = v(i, j)

    fun neighbours() : List<Piece> {
        val result = ArrayList<Piece>()
        if (i > 0) {
            result.add(Image.pieces[i - 1][j])
        }
        if (j > 0) {
            result.add(Image.pieces[i][j - 1])
        }
        if (i < Image.piecesX - 2) {
            result.add(Image.pieces[i + 1][j])
        }
        if (j < Image.piecesY - 2) {
            result.add(Image.pieces[i][j + 1])
        }
        return result
    }

    fun alignDelta(otherPiece : Piece) : Vector {
        val imageDistance = (otherPiece.indexVector - this.indexVector) * Image.pieceSize.toDouble()
        val realDistance = otherPiece.pos - this.pos
        return realDistance - imageDistance
    }
}