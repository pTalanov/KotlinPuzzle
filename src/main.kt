package example

import js.dom.html.window

fun main(args: Array<String>) {
    val pieces = Image.piecesList
    for (piece in pieces) {
        canvasState.addShape(piece.bundle)
    }
    window.setInterval({
        canvasState.valid = false
    }, 1000)
}