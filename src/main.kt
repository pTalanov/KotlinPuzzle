package example

import jquery.*
import html5.*
import java.util.ArrayList
import js.*
import js.Math
import js.setInterval
import html5.getCanvas
import html5.getKotlinLogo
import jquery.jq
import js.setTimeout
import java.util.List

//
//class Creature(override var pos : Vector, val state : CanvasState) : Shape() {
//
//    val shadowOffset = v(- 5.0, 5.0)
//    val colorStops = gradientGenerator.getNext()
//    val relSize = 0.05
//    // these properties have no backing fields and in java/javascript they could be represented as little helper functions
//    val radius : Double
//    get() = state.width * relSize
//    val position : Vector
//    get() = if (selected) pos - shadowOffset else pos
//    val directionToLogo : Vector
//    get() = (Kotlin.centre - position).normalized
//
//    //notice how the infix call can make some expressions extremely expressive
//    override fun contains(mousePos : Vector) = pos distanceTo mousePos < radius
//
//    // defining more nice extension functions
//    fun Context.circlePath(position : Vector, rad : Double) {
//        arc(position.x, position.y, rad, 0.0, 2 * Math.PI, false)
//    }
//
//    //notice we can use an extension function we just defined inside another extension function
//    fun Context.fillCircle(position : Vector, rad : Double) {
//        fillPath {
//            circlePath(position, rad)
//        }
//    }
//
//    override fun draw(state : CanvasState) {
//        val context = state.context
//        if (!selected) {
//            drawCreature(context)
//        } else {
//            drawCreatureWithShadow(context)
//        }
//    }
//
//    fun drawCreature(context : Context) {
//        context.fillStyle = getGradient(context)
//        context.fillPath {
//            tailPath(context)
//            circlePath(position, radius)
//        }
//        drawEye(context)
//    }
//
//    fun getGradient(context : Context) : CanvasGradient {
//        val gradientCentre = position + directionToLogo * (radius / 4)
//        val gradient = context.createRadialGradient(gradientCentre.x, gradientCentre.y, 1.0, gradientCentre.x, gradientCentre.y, 2 * radius)
//        for (colorStop in colorStops) {
//            gradient.addColorStop(colorStop._1, colorStop._2)
//        }
//        return gradient
//    }
//
//    fun tailPath(context : Context) {
//        val tailDirection = - directionToLogo
//        val tailPos = position + tailDirection * radius * 1.0
//        val tailSize = radius * 1.6
//        val angle = Math.PI / 6.0
//        val p1 = tailPos + tailDirection.rotatedBy(angle) * tailSize
//        val p2 = tailPos + tailDirection.rotatedBy(- angle) * tailSize
//        val middlePoint = position + tailDirection * radius * 1.0
//        context.moveTo(tailPos.x, tailPos.y)
//        context.lineTo(p1.x, p1.y)
//        context.quadraticCurveTo(middlePoint.x, middlePoint.y, p2.x, p2.y)
//        context.lineTo(tailPos.x, tailPos.y)
//    }
//
//    fun drawEye(context : Context) {
//        val eyePos = directionToLogo * radius * 0.6 + position
//        val eyeRadius = radius / 3
//        val eyeLidRadius = eyeRadius / 2
//        context.fillStyle = "#FFFFFF"
//        context.fillCircle(eyePos, eyeRadius)
//        context.fillStyle = "#000000"
//        context.fillCircle(eyePos, eyeLidRadius)
//    }
//
//    fun drawCreatureWithShadow(context : Context) {
//        context.shadowed(shadowOffset, 0.7) {
//            context.fillStyle = getGradient(context)
//            fillPath {
//                tailPath(context)
//                context.circlePath(position, radius)
//            }
//        }
//        drawEye(context)
//    }
//}

fun main(args : Array<String>) {
    val state = CanvasState(getCanvas())
    state.addShape(Image.splitInPieces().get(0))
    setTimeout({
        state.valid = false
    })
}

fun <T> List<T>.reversed() : List<T> {
    val result = ArrayList<T>()
    var i = size()
    while (i > 0) {
        result.add(get(--i))
    }
    return result
}
