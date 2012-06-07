package example

import java.util.ArrayList
import js.dom.html.*

fun getImage(path: String): HTMLImageElement {
    val image = window.document.createElement("img") as HTMLImageElement
    image.src = path
    return image
}

object Image {
    val data: HTMLImageElement
        get() = getImage("Penguins.jpg")
    val width = 1024
    val height = 768
    val piecesX = 4
    val piecesY = 3
    val piecesList = ArrayList<Piece>()
    val pieceSize = width / piecesX
    val pieces: Array<Array<Piece>> = splitInPieces()
    val piecesCount: Int
        get() = piecesX * piecesY


    fun splitInPieces(): Array<Array<Piece>> {
        val shuffler = Shuffler(piecesX, piecesY)
        return  Array(piecesX) {
        x ->
            Array(piecesY) {
            y ->
                val xy = shuffler.getNextPair()
                val imagePiece = Piece(i = x, j = y,
                        imageX = x * pieceSize, imageY = y * pieceSize,
                        width = pieceSize, height = pieceSize,
                        startingPos = v(xy._1 * pieceSize, xy._2 * pieceSize))
                piecesList.add(imagePiece)
                imagePiece
            }
        }
    }
}

class Shuffler(val x: Int, val y: Int) {
    // Pair
    val all = ArrayList<#(Int, Int)>();
    {
        for (i in 0..x - 1) {
            for (j in 0..y - 1) {
                all.add(#(i, j))
            }
        }
    }

    // Pair
    fun getNextPair(): #(Int, Int) {
        val randomValue = Math.floor((all.size() - 1) * Math.random())
        val value = all[randomValue]
        all.remove(value : Any?)
        return value
    }
}


var haveWon = false
    set(won) {
        if (won and !$haveWon) {
            val canvasDiv = window.document.getElementById("logo")!! as HTMLDivElement
            canvasDiv.innerHTML = "<p>Congratulations!<br/>Click on the logo!<br/>" + canvasDiv.innerHTML
        }
        $haveWon = won
    }
