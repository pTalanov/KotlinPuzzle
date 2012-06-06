package example

import js.dom.html.window
import js.jquery.jq

fun main(args: Array<String>) {
    jq {
        val pieces = Image.piecesList
        for (piece in pieces) {
            canvasState.addShape(piece.bundle)
        }
        window.setInterval({
            canvasState.valid = false
        }, 1000)
    }
}