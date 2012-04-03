package example

import html5.HTMLImageElement
import html5.getImage
import java.util.ArrayList
import kotlin.ranges.shuffled

object Image {
    val data : HTMLImageElement
    get() = getImage("Penguins.jpg")
    val width = 1024
    val height = 768
    val piecesX = 8
    val piecesY = 6
    val piecesList = ArrayList<Piece>
    val pieceSize = width / piecesX
    val pieces : Array<Array<Piece>> = splitInPieces()


    fun splitInPieces() : Array<Array<Piece>> {
        val xRange = 0..piecesX - 1
        val xShuffled = xRange.shuffled()
        val yRange = 0..piecesY - 1
        val yShuffled = yRange.shuffled()

        return  Array(piecesX) {
        x ->
            Array(piecesY) {
            y ->
                val imagePiece = Piece(i = x, j = y,
                        imageX = x * pieceSize, imageY = y * pieceSize,
                        width = pieceSize, height = pieceSize,
                        startingPos = v(xShuffled[x] * pieceSize, yShuffled[y] * pieceSize))
                piecesList.add(imagePiece)
                imagePiece
            }
        }
    }
}