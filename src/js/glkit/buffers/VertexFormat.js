import { GLType } from '../gl'
import { isEqual } from 'lodash'

const _it_ = Symbol.iterator

/**
* A generic vertex format.
*/
export class VertexFormat {
  /**
  * Create a new vertex format.
  *
  * @param {Array<string>} fields - Field names.
  * @param {Array<GLEnum>} types - Field types.
  */
  constructor (fields, types) {
    if (fields.length !== types.length) {
      throw new Error([
        'Unnable to create VertexFormat : fields array length ',
        `(${fields.length}) is not equal to types array length `,
        `(${types.length}).`
      ].join(''))
    }

    let cursor = 0
    this._topology = {}
    this._fields = fields.concat([])

    for (let i = 0; i < fields.length; ++i) {
      if (!(types[i] in VertexFormat.SIZES)) {
        throw new Error(
          `Unnable to create VertexFormat : unknown GLType ${types[i]}`
        )
      }

      if (!(fields[i] in this._fields)) {
        const start = cursor
        cursor += VertexFormat.SIZES[types[i]]
        const end = cursor
        this._topology[fields[i]] = [types[i], start, end]
      } else {
        throw new Error([
          'Unnable to create vertex buffer format : duplicate field name "',
          `${fields[i]}".`
        ].join(''))
      }
    }

    this._size = cursor
  }

  /**
  * @return {number} Size of an entry of this format.
  */
  get size () {
    return this._size
  }

  /**
  * Return the start location of a field in a structure of this format.
  *
  * @param {string} field - Name of the field.
  *
  * @return {number} Start location of the field in a structure of this format.
  */
  start (field) {
    return this._topology[field][1]
  }

  /**
  * Return the end location of a field in a structure of this format.
  *
  * @param {string} field - Name of the field.
  *
  * @return {number} End location of the field in a structure of this format.
  */
  end (field) {
    return this._topology[field][2]
  }

  /**
  * Return the type of a field.
  *
  * @param {string} field - Field name.
  *
  * @return {GLEnum} The type of the field.
  */
  type (field) {
    return this._topology[field][0]
  }

  /**
  * Fill a view with data.
  *
  * @param {DataView} view - View to use.
  * @param {number} index - Index to fill.
  * @param {object} data - Data to set at the index.
  *
  * @return {VertexFormat} The current format for chaining purpose.
  */
  fill (view, index, data) {
    const base = index * this._size
    for (const field in data) {
      if (field in this._topology) {
        const [type, start] = this._topology[field]
        VertexFormat.SET[type](view, base + start, data[field])
      }
    }
  }

  /**
  * Set a field data.
  *
  * @param {DataView} view - View to use.
  * @param {number} index - Index to fill.
  * @param {string} field - Field to set at the index.
  * @param {any} value - Value to set
  *
  * @return {VertexFormat} The current format for chaining purpose.
  */
  set (view, index, field, value) {
    const base = index * this._size
    const [type, start] = this._topology[field]
    VertexFormat.SET[type](view, base + start, value)
  }

  /**
  * Extract data from a view.
  *
  * @param {DataView} view - View to use.
  * @param {number} index - Index to fill.
  * @param {string} [name] - Name of the field to return.
  *
  * @return {object|any} The current format for chaining purpose.
  */
  get (view, index, name) {
    const base = index * this._size

    if (name == null) {
      const result = {}

      for (const field of this._fields) {
        const [type, start] = this._topology[field]
        result[field] = VertexFormat.GET[type](view, base + start)
      }

      return result
    } else {
      const [type, start] = this._topology[name]
      return VertexFormat.GET[type](view, base + start)
    }
  }

  /**
  * Return true if both format are similar.
  *
  * @param {VertexFormat} other - Format to compare.
  *
  * @return {boolean} True if both format are similar.
  */
  equals (other) {
    return other === this || (
      other != null &&
      isEqual(this._topology, other._topology)
    )
  }

  /**
  * Iterate over all fields name of this format.
  *
  * @return {Iterator<string>} An iterator over all fields name of this format.
  */
  * fields () {
    yield * this._fields
  }
}

VertexFormat.SIZES = {
  [GLType.FLOAT]: Float32Array.BYTES_PER_ELEMENT,
  [GLType.FLOAT_VEC2]: Float32Array.BYTES_PER_ELEMENT * 2,
  [GLType.FLOAT_VEC3]: Float32Array.BYTES_PER_ELEMENT * 3,
  [GLType.FLOAT_VEC4]: Float32Array.BYTES_PER_ELEMENT * 4,
  [GLType.INT]: Int32Array.BYTES_PER_ELEMENT,
  [GLType.INT_VEC2]: Int32Array.BYTES_PER_ELEMENT * 2,
  [GLType.INT_VEC3]: Int32Array.BYTES_PER_ELEMENT * 3,
  [GLType.INT_VEC4]: Int32Array.BYTES_PER_ELEMENT * 4,
  [GLType.FLOAT_MAT2]: Float32Array.BYTES_PER_ELEMENT * 4,
  [GLType.FLOAT_MAT3]: Float32Array.BYTES_PER_ELEMENT * 9,
  [GLType.FLOAT_MAT4]: Float32Array.BYTES_PER_ELEMENT * 16,
  [GLType.BYTE]: Int8Array.BYTES_PER_ELEMENT,
  [GLType.SHORT]: Int16Array.BYTES_PER_ELEMENT,
  [GLType.UNSIGNED_BYTE]: Uint8Array.BYTES_PER_ELEMENT,
  [GLType.UNSIGNED_SHORT]: Uint16Array.BYTES_PER_ELEMENT,
  [GLType.HALF_FLOAT]: Float32Array.BYTES_PER_ELEMENT / 2
}

VertexFormat.SET = {
  [GLType.FLOAT]: (view, index, value) => view.setFloat32(index, value),
  [GLType.FLOAT_VEC2]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Float32Array.BYTES_PER_ELEMENT
    view.setFloat32(index, iterator.next().value || 0, true)
    view.setFloat32(index + step, iterator.next().value || 0, true)
  },
  [GLType.FLOAT_VEC3]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Float32Array.BYTES_PER_ELEMENT
    view.setFloat32(index, iterator.next().value || 0, true)
    view.setFloat32(index + step, iterator.next().value || 0, true)
    view.setFloat32(index + step * 2, iterator.next().value || 0, true)
  },
  [GLType.FLOAT_VEC4]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Float32Array.BYTES_PER_ELEMENT
    view.setFloat32(index, iterator.next().value || 0, true)
    view.setFloat32(index + step, iterator.next().value || 0, true)
    view.setFloat32(index + step * 2, iterator.next().value || 0, true)
    view.setFloat32(index + step * 3, iterator.next().value || 0, true)
  },
  [GLType.INT]: (view, index, value) => {
    view.setInt32(index, value)
  },
  [GLType.INT_VEC2]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Int32Array.BYTES_PER_ELEMENT
    view.setInt32(index, iterator.next().value || 0)
    view.setInt32(index + step, iterator.next().value || 0)
  },
  [GLType.INT_VEC3]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Int32Array.BYTES_PER_ELEMENT
    view.setInt32(index, iterator.next().value || 0)
    view.setInt32(index + step, iterator.next().value || 0)
    view.setInt32(index + step * 2, iterator.next().value || 0)
  },
  [GLType.INT_VEC4]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Int32Array.BYTES_PER_ELEMENT
    view.setInt32(index, iterator.next().value || 0)
    view.setInt32(index + step, iterator.next().value || 0)
    view.setInt32(index + step * 2, iterator.next().value || 0)
    view.setInt32(index + step * 3, iterator.next().value || 0)
  },
  [GLType.FLOAT_MAT2]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Float32Array.BYTES_PER_ELEMENT
    view.setFloat32(index, iterator.next().value || 0, true)
    view.setFloat32(index + step, iterator.next().value || 0, true)
    view.setFloat32(index + step * 2, iterator.next().value || 0, true)
    view.setFloat32(index + step * 3, iterator.next().value || 0, true)
  },
  [GLType.FLOAT_MAT3]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Float32Array.BYTES_PER_ELEMENT
    view.setFloat32(index, iterator.next().value || 0, true)
    view.setFloat32(index + step, iterator.next().value || 0, true)
    view.setFloat32(index + step * 2, iterator.next().value || 0, true)
    view.setFloat32(index + step * 3, iterator.next().value || 0, true)
    view.setFloat32(index + step * 4, iterator.next().value || 0, true)
    view.setFloat32(index + step * 5, iterator.next().value || 0, true)
    view.setFloat32(index + step * 6, iterator.next().value || 0, true)
    view.setFloat32(index + step * 7, iterator.next().value || 0, true)
    view.setFloat32(index + step * 8, iterator.next().value || 0, true)
  },
  [GLType.FLOAT_MAT4]: (view, index, value) => {
    const iterator = (value[_it_]) ? value[_it_]() : value
    const step = Float32Array.BYTES_PER_ELEMENT
    view.setFloat32(index, iterator.next().value || 0, true)
    view.setFloat32(index + step, iterator.next().value || 0, true)
    view.setFloat32(index + step * 2, iterator.next().value || 0, true)
    view.setFloat32(index + step * 3, iterator.next().value || 0, true)
    view.setFloat32(index + step * 4, iterator.next().value || 0, true)
    view.setFloat32(index + step * 5, iterator.next().value || 0, true)
    view.setFloat32(index + step * 6, iterator.next().value || 0, true)
    view.setFloat32(index + step * 7, iterator.next().value || 0, true)
    view.setFloat32(index + step * 8, iterator.next().value || 0, true)
    view.setFloat32(index + step * 9, iterator.next().value || 0, true)
    view.setFloat32(index + step * 10, iterator.next().value || 0, true)
    view.setFloat32(index + step * 11, iterator.next().value || 0, true)
    view.setFloat32(index + step * 12, iterator.next().value || 0, true)
    view.setFloat32(index + step * 13, iterator.next().value || 0, true)
    view.setFloat32(index + step * 14, iterator.next().value || 0, true)
    view.setFloat32(index + step * 15, iterator.next().value || 0, true)
  },
  [GLType.BYTE]: (view, index, value) => {
    view.setInt8(index, value)
  },
  [GLType.SHORT]: (view, index, value) => {
    view.setInt16(index, value)
  },
  [GLType.UNSIGNED_BYTE]: (view, index, value) => {
    view.setUint8(index, value)
  },
  [GLType.UNSIGNED_SHORT]: (view, index, value) => {
    view.setUint16(index, value)
  },
  [GLType.HALF_FLOAT]: (view, index, value) => {
    // @TODO WebGL2.0
  }
}

VertexFormat.GET = {
  [GLType.FLOAT]: (view, index) => view.getFloat32(index, true),
  [GLType.FLOAT_VEC2]: (view, index) => {
    const step = Float32Array.BYTES_PER_ELEMENT
    return [
      view.getFloat32(index, true),
      view.getFloat32(index + step, true)
    ]
  },
  [GLType.FLOAT_VEC3]: (view, index) => {
    const step = Float32Array.BYTES_PER_ELEMENT
    return [
      view.getFloat32(index, true),
      view.getFloat32(index + step, true),
      view.getFloat32(index + step * 2, true)
    ]
  },
  [GLType.FLOAT_VEC4]: (view, index) => {
    const step = Float32Array.BYTES_PER_ELEMENT
    return [
      view.getFloat32(index, true),
      view.getFloat32(index + step, true),
      view.getFloat32(index + step * 2, true),
      view.getFloat32(index + step * 3, true)
    ]
  },
  [GLType.INT]: (view, index) => view.getInt32(index),
  [GLType.INT_VEC2]: (view, index) => {
    const step = Int32Array.BYTES_PER_ELEMENT
    return [
      view.getInt32(index),
      view.getInt32(index + step)
    ]
  },
  [GLType.INT_VEC3]: (view, index) => {
    const step = Int32Array.BYTES_PER_ELEMENT
    return [
      view.getInt32(index),
      view.getInt32(index + step),
      view.getInt32(index + step * 2)
    ]
  },
  [GLType.INT_VEC4]: (view, index) => {
    const step = Int32Array.BYTES_PER_ELEMENT
    return [
      view.getInt32(index),
      view.getInt32(index + step),
      view.getInt32(index + step * 2),
      view.getInt32(index + step * 3)
    ]
  },
  [GLType.FLOAT_MAT2]: (view, index) => {
    const step = Float32Array.BYTES_PER_ELEMENT
    return [
      view.getFloat32(index, true),
      view.getFloat32(index + step, true),
      view.getFloat32(index + step * 2, true),
      view.getFloat32(index + step * 3, true)
    ]
  },
  [GLType.FLOAT_MAT3]: (view, index) => {
    const step = Float32Array.BYTES_PER_ELEMENT
    return [
      view.getFloat32(index, true),
      view.getFloat32(index + step, true),
      view.getFloat32(index + step * 2, true),
      view.getFloat32(index + step * 3, true),
      view.getFloat32(index + step * 4, true),
      view.getFloat32(index + step * 5, true),
      view.getFloat32(index + step * 6, true),
      view.getFloat32(index + step * 7, true),
      view.getFloat32(index + step * 8, true)
    ]
  },
  [GLType.FLOAT_MAT4]: (view, index) => {
    const step = Float32Array.BYTES_PER_ELEMENT
    return [
      view.getFloat32(index, true),
      view.getFloat32(index + step, true),
      view.getFloat32(index + step * 2, true),
      view.getFloat32(index + step * 3, true),
      view.getFloat32(index + step * 4, true),
      view.getFloat32(index + step * 5, true),
      view.getFloat32(index + step * 6, true),
      view.getFloat32(index + step * 7, true),
      view.getFloat32(index + step * 8, true),
      view.getFloat32(index + step * 9, true),
      view.getFloat32(index + step * 10, true),
      view.getFloat32(index + step * 11, true),
      view.getFloat32(index + step * 12, true),
      view.getFloat32(index + step * 13, true),
      view.getFloat32(index + step * 14, true),
      view.getFloat32(index + step * 15, true)
    ]
  },
  [GLType.BYTE]: (view, index) => view.getInt8(index),
  [GLType.SHORT]: (view, index) => view.getInt16(index),
  [GLType.UNSIGNED_BYTE]: (view, index) => view.getUint8(index),
  [GLType.UNSIGNED_SHORT]: (view, index) => view.getUint16(index),
  [GLType.HALF_FLOAT]: (view, index) => {
    // @TODO WebGL 2.0
  }
}
