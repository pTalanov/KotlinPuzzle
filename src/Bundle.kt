package example

import stdlib.any
import stdlib.arrayList

class Bundle(val mainPiece: Piece): Shape() {

    override fun contains(mousePos: Vector): Boolean {
        return pieces.any({ contains(mousePos) })
    }

    override var pos: Vector
        get() = mainPiece.pos
        set(newPos) {
            val delta = newPos - pos
            for (piece in pieces) {
                piece.pos += delta
            }
        }

    override var selected: Boolean = false
        set(newVal) {
            $selected = newVal
            if (!selected) {
                for (piece in pieces) {
                    mergeNeighbours(piece)
                }
            }
        }

    fun mergeNeighbours(piece: Piece) {
        for (neighbour in piece.neighbours()) {
            if (neighbour == null) {
                continue
            }
            val alignDelta = piece.alignDelta(neighbour)
            if (alignDelta.sqr < 60.0) {
                if (neighbour.bundle != this) {
                    merge(neighbour.bundle, alignDelta)
                }
            }
        }
        haveWon = pieces.size() == PuzzleImage.pieceCount
    }

    override fun draw(state: CanvasState) {
        for (piece in pieces) {
            piece.drawImagePart(state)
            piece.drawBorders(state)
        }
    }

    val pieces = arrayList(mainPiece)

    fun merge(otherBundle: Bundle, alignDelta: Vector) {
        for (piece in otherBundle.pieces) {
            pieces.add(piece)
            piece.bundle = this
            piece.pos -= alignDelta
        }
        canvasState.removeShape(otherBundle)
    }
}
