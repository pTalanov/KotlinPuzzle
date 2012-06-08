package example

import java.util.ArrayList
import js.dom.html.*
import stdlib.Pair
import stdlib.pair

fun loadImageFromResource(path: String): HTMLImageElement {
    val image = window.document.createElement("img") as HTMLImageElement
    image.src = path
    return image
}

object PuzzleImage {
    val data: HTMLImageElement
        get() = loadImageFromResource("Penguins.jpg")
    val width = 800
    val height = 600
    val piecesX = 4
    val piecesY = 3
    val piecesList = ArrayList<Piece>()
    val pieceSize = width / piecesX
    val pieceCount = piecesX * piecesY
    val pieces = splitInPieces()

    fun get(i: Int, j: Int): Piece? {
        return if ((i in 0..piecesX - 1) && (j in 0..piecesY - 1)) {
            pieces[i][j]
        } else {
            null
        }
    }


    fun splitInPieces(): Array<Array<Piece>> {
        val shuffler = Shuffler(piecesX, piecesY)
        return Array(piecesX) {
        x ->
            Array(piecesY) {
            y ->
                val xy = shuffler.getNextPair()
                val startingOffset = 50
                val imagePiece = Piece(
                        i = x,
                        j = y,
                        imageX = x * pieceSize,
                        imageY = y * pieceSize,
                        width = pieceSize,
                        height = pieceSize,
                        startingPos = v(startingOffset + xy.first * pieceSize, startingOffset + xy.second * pieceSize)
                )
                piecesList.add(imagePiece)
                imagePiece
            }
        }
    }
}

class Shuffler(val x: Int, val y: Int) {

    val all = ArrayList<Pair<Int, Int>>();
    {
        for (i in 0..x - 1) {
            for (j in 0..y - 1) {
                all.add(pair(i, j))
            }
        }
    }

    fun getNextPair(): Pair<Int, Int> {
        val randomValue = Math.floor((all.size() - 1) * Math.random())
        val value = all[randomValue]
        all.remove(value : Any?)
        return value
    }
}


var haveWon = false
    set(won) {
        if (won && !$haveWon) {
            val logo = window.document.getElementById("logoimage")!! as HTMLImageElement
            logo.width = 250.0
            logo.height = 250.0
        }
        $haveWon = won
    }
