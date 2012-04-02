package example

import java.util.ArrayList

class Bundle(val mainPiece : Piece) : Shape() {
    override fun contains(mousePos : Vector) : Boolean {
        for (piece in pieces) {
            if (piece.contains(mousePos)) {
                return true
            }
        }
        return false
    }

    override var pos : Vector
    get() = mainPiece.pos
    set(newPos) {
        val delta = newPos - pos
        for (piece in pieces) {
            piece.pos += delta
        }
    }

    override var selected : Boolean = false
    set(newVal) {
        $selected = newVal
        if (!selected) {
            for (piece in pieces) {
                mergeNeighbours(piece)
            }
        }
    }

    fun mergeNeighbours(piece : Piece) {
        for (neighbour in piece.neighbours()) {
            val alignDelta = piece.alignDelta(neighbour)
            if (alignDelta.sqr < 30.0) {
                if (neighbour.bundle != this) {
                    merge(neighbour.bundle, alignDelta)
                }
            }
        }
    }

    override fun draw(state : CanvasState) {
        for (piece in pieces) {
            piece.draw(state)
        }
    }

    val pieces = ArrayList<Piece>();
    {
        pieces.add(mainPiece)
    }

    fun merge(otherBundle : Bundle, alignDelta : Vector) {
        for (piece in otherBundle.pieces) {
            pieces.add(piece)
            piece.bundle = this
            piece.pos -= alignDelta
        }
        canvasState.removeShape(otherBundle)
    }
}