package stdlib

import java.util.*

//These functions and classes will be available by default when stdlib will be there for js-backend
class Pair<T1, T2>(val first: T1, val second: T2) {
}

fun <T1, T2> pair(first: T1, second: T2) = Pair(first, second)

fun <T> List<T>.any(predicate: T.() -> Boolean): Boolean {
    for (elem in this) {
        if (elem.predicate()) {
            return true
        }
    }
    return false
}

fun <T> arrayList(vararg args: T): ArrayList<T> {
    var result = ArrayList<T>()
    for (element in args) {
        result.add(element)
    }
    return result
}