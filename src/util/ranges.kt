package kotlin.ranges

import java.util.ArrayList
import java.util.List
import js.*

fun IntRange.shuffled() : Array<Int> {
    val ordered = ArrayList<Int>()
    for (i in this) {
        ordered.add(i)
    }
    return Array(ordered.size()) {
        val randomValue = Math.floor((ordered.size() - 1) * Math.random())
        val value = ordered[randomValue]
        ordered.remove(value as Any?)
        value
    }
}

fun <T> List<T>.reversed() : List<T> {
    val result = ArrayList<T>()
    var i = size()
    while (i > 0) {
        result.add(get(--i))
    }
    return result
}