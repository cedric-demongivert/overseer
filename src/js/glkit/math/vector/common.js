
/**
* Transform the given vector into a string.
*
* @param {Vector} vector - A vector to transform.
*
* @return {String} A string representation of the given vector.
*/
export function toString (vector) {
  if (vector == null) {
    return 'vector null'
  } else if (vector.dimension === 0){
    return `vector ${vector.dimension} ${vector.type} []`
  } else {
    return [
      `vector ${vector.dimension} ${vector.type} [`,
      [...vector].join(', '),
      ']'
    ].join('')
  }
}
