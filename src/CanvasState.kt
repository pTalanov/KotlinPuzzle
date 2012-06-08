package example

import java.util.ArrayList
import js.dom.html.HTMLElement
import js.dom.html.window
import js.dom.html5.HTMLCanvasElement
import js.jquery.*
import kotlin.ranges.reversed

val canvas: HTMLCanvasElement
    get() {
        return window.document.getElementsByTagName("canvas").item(0)!! as HTMLCanvasElement
    }


class CanvasState(val canvas: HTMLCanvasElement) {
    val width = canvas.width
    val height = canvas.height
    val size: Vector
        get() = v(width, height)
    val context = canvas.getContext("2d")!!
    var valid = false
    val shapes = ArrayList<Shape>()
    var selection: Shape? = null
    var dragOff = Vector()
    val interval = 1000 / 50

    {
        jq(canvas).mousedown { it ->
            unsetSelection()
            val mousePos = mousePos(it)
            for (shape in shapes.reversed()) {
                if (mousePos in shape) {
                    dragOff = mousePos - shape.pos
                    shape.selected = true
                    selection = shape
                    removeShape(shape)
                    break
                }
            }
        }

        jq(canvas).mousemove { it ->
            if (selection != null) {
                selection!!.pos = mousePos(it) - dragOff
                valid = false
            }
        }

        jq(canvas).mouseup {
            unsetSelection()
        }

        window.setInterval({
            draw()
        }, interval)
    }


    fun mousePos(e: MouseEvent): Vector {
        var offset = Vector()
        var element: HTMLElement? = canvas
        while (element != null) {
            val el: HTMLElement = element!!
            offset += Vector(el.offsetLeft, el.offsetTop)
            element = el.offsetParent
        }
        return Vector(e.pageX, e.pageY) - offset
    }

    fun addShape(shape: Shape) {
        shapes.add(shape)
        valid = false
    }

    fun removeShape(shape: Shape) {
        shapes.remove(shape)
        valid = false
    }

    fun unsetSelection() {
        val sel = selection
        if (sel != null) {
            sel.selected = false
            addShape(sel)
        }
        selection = null
        valid = false
    }

    fun clear() {
        val white = "#FFFFFF"
        context.fillStyle = white
        context.fillRect(0, 0, width, height)
    }

    fun draw() {
        if (valid) return

        clear()
        for (shape in shapes) {
            shape.draw(this)
        }
        selection?.draw(this)
        valid = true
    }
}


//This ugly code won't be needed when we have lazy annotation
private var _canvasState: CanvasState? = null
val canvasState: CanvasState
    get() {
        if (_canvasState == null) {
            _canvasState = CanvasState(canvas)
        }
        return _canvasState!!
    }

