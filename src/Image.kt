package example

import html5.getKotlinLogo
import java.util.List
import java.util.ArrayList
import jquery.jq
import html5.HTMLImageElement
import html5.getImage

object Image {
    val data : HTMLImageElement
    get() = getImage("Chrysanthemum.jpg")
    val width = 400
    val height = 400
    val pieces = 5

    fun splitInPieces() : List<Piece> {
        val r = ArrayList<Piece>()
        r.add(Piece(0, 0, 0, 0, 100, 100))
        return r
    }
}