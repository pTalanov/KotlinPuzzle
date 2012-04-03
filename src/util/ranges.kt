package kotlin.ranges

import java.util.ArrayList
import java.util.List

fun <T> List<T>.reversed() : List<T> {
    val result = ArrayList<T>()
    var i = size()
    while (i > 0) {
        result.add(get(--i))
    }
    return result
}