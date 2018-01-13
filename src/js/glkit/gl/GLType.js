export const GLType = {
  /**
  * Identify the GLType of a value.
  *
  * @param {any} value - Value to check.
  *
  * @return {GLEnum} The type of the value (FLOAT, FLOAT_VEC2, FLOAT_VEC3, FLOAT_VEC4, INT, INT_VEC2, INT_VEC3, INT_VEC4, FLOAT_MAT2, FLOAT_MAT3, FLOAT_MAT4)
  */
  typeof (value) {
    if (value != null && value[GLType.type]) {
      return value[GLType.type]
    } else if (typeof value === 'number') {
      return GLType.FLOAT
    } else if (value instanceof Array) {
      return GLType._typeofArray(value)
    }

    throw new Error([
      'Unnable to identify the type of the value ',
      value
    ].join(''))
  },

  /**
  * Identify the GLType of an array.
  *
  * @param {any} value - Value to check.
  *
  * @return {GLType} The type of the value.
  */
  _typeofArray (array) {
    if (typeof array[0] === 'number') {
      switch (array.length) {
        case 1: return GLType.FLOAT
        case 2: return GLType.FLOAT_VEC2
        case 3: return GLType.FLOAT_VEC3
        case 4: return GLType.FLOAT_VEC4
        case 9: return GLType.FLOAT_MAT3
        case 16: return GLType.FLOAT_MAT4
        default:
      }
    }

    throw new Error([
      'Unnable to identify the type of the value ',
      array
    ].join(''))
  },

  /**
  * Return the GLValue of a variable.
  *
  * @param {any} value - Variable to check.
  *
  * @return {GLValue} The GLValue of the variable.
  */
  valueof (value) {
    return (value[GLType.value]) ? value[GLType.value] : value
  },

  /**
  * Return the size of a value.
  *
  * @param {any} value - The value to check.
  * @return {number} The size of the value.
  */
  sizeof (value) {
    if (value != null && value[GLType.size]) {
      return value[GLType.size]
    } else if (value.length !== undefined) {
      return value.length
    } else {
      return 1
    }
  }
}

GLType.type = Symbol('GLType#type')
GLType.value = Symbol('GLType#value')
GLType.size = Symbol('GLType#size')

if (window.WebGLRenderingContext) {
  GLType.FLOAT = window.WebGLRenderingContext.FLOAT
  GLType.FLOAT_VEC2 = window.WebGLRenderingContext.FLOAT_VEC2
  GLType.FLOAT_VEC3 = window.WebGLRenderingContext.FLOAT_VEC3
  GLType.FLOAT_VEC4 = window.WebGLRenderingContext.FLOAT_VEC4
  GLType.INT = window.WebGLRenderingContext.INT
  GLType.INT_VEC2 = window.WebGLRenderingContext.INT_VEC2
  GLType.INT_VEC3 = window.WebGLRenderingContext.INT_VEC3
  GLType.INT_VEC4 = window.WebGLRenderingContext.INT_VEC4
  GLType.FLOAT_MAT2 = window.WebGLRenderingContext.FLOAT_MAT2
  GLType.FLOAT_MAT3 = window.WebGLRenderingContext.FLOAT_MAT3
  GLType.FLOAT_MAT4 = window.WebGLRenderingContext.FLOAT_MAT
  GLType.BYTE = window.WebGLRenderingContext.BYTE
  GLType.SHORT = window.WebGLRenderingContext.SHORT
  GLType.UNSIGNED_BYTE = window.WebGLRenderingContext.UNSIGNED_BYTE
  GLType.UNSIGNED_SHORT = window.WebGLRenderingContext.UNSIGNED_SHORT
  GLType.FLOAT = window.WebGLRenderingContext.FLOAT
  GLType.HALF_FLOAT = window.WebGLRenderingContext.HALF_FLOAT || Symbol()
  GLType.SAMPLER_2D = window.WebGLRenderingContext.SAMPLER_2D
  GLType.SAMPLER_CUBE = window.WebGLRenderingContext.SAMPLER_CUBE
} else {
  GLType.FLOAT = Symbol()
  GLType.FLOAT_VEC2 = Symbol()
  GLType.FLOAT_VEC3 = Symbol()
  GLType.FLOAT_VEC4 = Symbol()
  GLType.INT = Symbol()
  GLType.INT_VEC2 = Symbol()
  GLType.INT_VEC3 = Symbol()
  GLType.INT_VEC4 = Symbol()
  GLType.FLOAT_MAT2 = Symbol()
  GLType.FLOAT_MAT3 = Symbol()
  GLType.FLOAT_MAT4 = Symbol()
  GLType.BYTE = Symbol()
  GLType.SHORT = Symbol()
  GLType.UNSIGNED_BYTE = Symbol()
  GLType.UNSIGNED_SHORT = Symbol()
  GLType.FLOAT = Symbol()
  GLType.HALF_FLOAT = Symbol()
  GLType.SAMPLER_2D = Symbol()
  GLType.SAMPLER_CUBE = Symbol()
}
