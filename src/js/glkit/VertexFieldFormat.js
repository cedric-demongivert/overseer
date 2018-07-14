export class VertexFieldFormat {
  constructor () {
    this._name = null
    this._size = 0
    this._type = 0
    this._normalized = false
    this._stride = 0
    this._offset = 0
  }

  get name () {
    return this._name
  }

  get size () {
    return this._size
  }
}

export class VertexFieldFormatBuilder {
  constructor () {
    this._name = null
    this._size = 0
    this._type = 0
    this._normalized = false
    this._stride = 0
    this._offset = 0
  }

  withName (name) {
    this._name = name
    return this
  }

  withSize (size) {
    this._size = size
    return this
  }

  withType (type) {
    this._type = type
    return this
  }

  normalized (value = true) {
    this._normalized = value
    return this
  }

  withStride (stride) {
    this._stride = stride
    return this
  }

  withOffset (offset) {
    this._offset = offset
    return this
  }

  build () {
    return new VertexFieldFormat(

    )
  }
}

class VertexFieldType {
  constructor (value, resolver) {
    this._value = value
    this._resolver = resolver
  }

  get value () {
    return this._value
  }

  resolve (context) {
    return this._resolver(context)
  }
}

VertexFieldFormat.BYTE = new VertexFieldType(
  0, context => context.BYTE
)

VertexFieldFormat.SHORT = new VertexFieldType(
  1, context => context.SHORT
)

VertexFieldFormat.UNSIGNED_BYTE = new VertexFieldType(
  2, context => context.UNSIGNED_BYTE
)

VertexFieldFormat.UNSIGNED_SHORT = new VertexFieldType(
  3, context => context.UNSIGNED_SHORT
)

VertexFieldFormat.FLOAT = new VertexFieldType(
  4, context => context.FLOAT
)

VertexFieldFormat.HALF_FLOAT = new VertexFieldType(
  5, context => context.HALF_FLOAT
)
