package example

import java.util.ArrayList
import java.util.List
import util.strokeLine

class Piece(val i : Int, val j : Int,
            startingPos : Vector,
            val imageX : Int, val imageY : Int,
            val width : Int, val height : Int) {
    var pos : Vector = startingPos
    var bundle : Bundle = Bundle(this)

    val leftNeighbour : Piece?
    get() = if (i > 0) Image.pieces[i - 1][j] else null
    val rightNeighbour : Piece?
    get() = if (i < Image.piecesX - 2) Image.pieces[i + 1][j] else null
    val topNeighbour : Piece?
    get() = if (j > 0) Image.pieces[i][j - 1] else null
    val bottomNeighbour : Piece?
    get() = if (j < Image.piecesY - 2) Image.pieces[i][j + 1] else null


    fun contains(mousePos : Vector) : Boolean = mousePos.isInRect(pos, v(width.toDouble(), height.toDouble()))

    fun drawBorders(state : CanvasState) {
        val context = state.context
        context.strokeStyle = "#000000"
        context.lineWidth = 4.0
        if (leftNeighbour?.bundle != bundle) {
            context.strokeLine(pos.x.toInt(), pos.y.toInt(), pos.x.toInt(), pos.y.toInt() + height)
        }
        if (rightNeighbour?.bundle != bundle) {
            context.strokeLine(pos.x.toInt() + width, pos.y.toInt(), pos.x.toInt() + width, pos.y.toInt() + height)
        }
        if (bottomNeighbour?.bundle != bundle)  {
            context.strokeLine(pos.x.toInt(), pos.y.toInt() + height, pos.x.toInt() + width, pos.y.toInt() + height)
        }
        if (topNeighbour?.bundle != bundle) {
            context.strokeLine(pos.x.toInt(), pos.y.toInt(), pos.x.toInt() + width, pos.y.toInt())
        }
    }


    fun drawImagePart(state : CanvasState) {
        // state.context.shadowed(v(1.0, 1.0), 0.8) {
        state.context.drawImage(Image.data, imageX, imageY, width, height, pos.x.toInt(), pos.y.toInt(), width, height)
        // }
    }

    val indexVector : Vector
    get() = v(i, j)

    fun neighbours() : List<Piece?> {
        val result = ArrayList<Piece?>()
        result.add(leftNeighbour)
        result.add(topNeighbour)
        result.add(bottomNeighbour)
        result.add(rightNeighbour)
        return result
    }

    fun alignDelta(otherPiece : Piece) : Vector {
        val imageDistance = (otherPiece.indexVector - this.indexVector) * Image.pieceSize.toDouble()
        val realDistance = otherPiece.pos - this.pos
        return realDistance - imageDistance
    }
}