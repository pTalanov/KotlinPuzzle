package example

import html5.Canvas
import html5.getCanvas
import html5.getContext
import java.util.ArrayList
import jquery.MouseEvent
import jquery.jq
import js.DomElement
import js.setInterval
import kotlin.ranges.reversed

class CanvasState(val canvas : Canvas) {
    var width = canvas.width
    var height = canvas.height
    val size : Vector
    get() = v(width, height)
    val context = getContext()
    var valid = false
    var shapes = ArrayList<Shape>()
    var selection : Shape? = null
    var dragOff = Vector()
    val interval = 1000 / 50

    {
        jq(canvas).mousedown {
            valid = false
            selection = null
            val mousePos = mousePos(it)
            for (shape in shapes.reversed()) {
                if (mousePos in shape) {
                    dragOff = mousePos - shape.pos
                    shape.selected = true
                    selection = shape
                    break
                }
            }
        }

        jq(canvas).mousemove {
            if (selection != null) {
                selection.sure().pos = mousePos(it) - dragOff
                valid = false
            }
        }

        jq(canvas).mouseup {
            selection?.selected = false
            selection = null
            valid = false
        }

        setInterval({
            draw()
        }, interval)
    }

    fun mousePos(e : MouseEvent) : Vector {
        var offset = Vector()
        var element : DomElement? = canvas
        while (element != null) {
            val el : DomElement = element.sure()
            offset += Vector(el.offsetLeft, el.offsetTop)
            element = el.offsetParent
        }
        return Vector(e.pageX, e.pageY) - offset
    }

    fun addShape(shape : Shape) {
        shapes.add(shape)
        valid = false
    }

    fun removeShape(shape : Shape) {
        shapes.remove(shape)
        valid = false
    }

    fun clear() {
        context.fillStyle = "#FFFFFF"
        context.fillRect(0, 0, width, height)
        context.strokeStyle = "#000000"
        context.lineWidth = 4.0
        context.strokeRect(0, 0, width, height)
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


val canvasState = CanvasState(getCanvas())
