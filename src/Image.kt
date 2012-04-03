package example

import html5.HTMLImageElement
import html5.getImage
import java.util.ArrayList
import js.*

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

class Shuffler(val x : Int, val y : Int) {
    val all = ArrayList<#(Int, Int)>();
    {
        for (i in 0..x - 1) {
            for (j in 0..y - 1) {
                all.add(#(i, j))
            }
        }
    }

    fun getNextPair() : #(Int, Int) {
        val randomValue = Math.floor((all.size() - 1) * Math.random())
        val value = all[randomValue]
        all.remove(value : Any?)
        return value
    }
}