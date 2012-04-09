package example

fun main(args : Array<String>) {
    val pieces = Image.piecesList
    for (piece in pieces) {
        canvasState.addShape(piece.bundle)
    }
    setInterval({
        canvasState.valid = false
    }, 1000)
}