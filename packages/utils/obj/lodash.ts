type PropertyName = string | number | symbol;

type List<T> = ArrayLike<T>;
/**
 * 
 * @param [['fred', 30], ['barney', 40]];
 * @returns => { 'fred': 30, 'barney': 40 }
 */
export function fromPairs<T>(pairs: List<[PropertyName, T]> | null | undefined) {
    var index = -1,
        length = pairs == null ? 0 : pairs.length,
        result = {};
    while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
    }
    return result;
}
export function isSymbol(value) {
    const type = typeof value
    return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}
export function isNil(val: any): boolean {
    return val == null;
}
export function isNumber(value) {
    return typeof value === 'number' ||
        (isObjectLike(value) && getTag(value) == '[object Number]')
}

function isObjectLike(value) {
    return typeof value === 'object' && value !== null
}
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
}

export function pick(object, keys) {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}