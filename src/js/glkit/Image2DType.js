export class Image2DType {
  constructor (value, resolver, allocator) {
    this._value = value
    this._resolver = resolver
    this._allocator = allocator
  }

  get value () {
    return this._value
  }

  resolve (context) {
    return this._resolver(context)
  }

  allocate (pixels) {
    return this._allocator(pixels)
  }
}

let nextIdentifier = 1
const next = _ => nextIdentifier++

Image2DType.BYTE = new Image2DType(
  next(),
  context => context.BYTE,
  pixels => new Int8Array(pixels)
)

Image2DType.UNSIGNED_BYTE = new Image2DType(
  next(),
  context => context.UNSIGNED_BYTE,
  pixels => new Uint8Array(pixels)
)

Image2DType.SHORT = new Image2DType(
  next(),
  context => context.SHORT,
  pixels => new Int16Array(pixels)
)

Image2DType.UNSIGNED_SHORT = new Image2DType(
  next(),
  context => context.UNSIGNED_SHORT,
  pixels => new Uint16Array(pixels)
)

Image2DType.UNSIGNED_SHORT_5_6_5 = new Image2DType(
  next(),
  context => context.UNSIGNED_SHORT_5_6_5,
  pixels => new Uint16Array(pixels)
)

Image2DType.UNSIGNED_SHORT_4_4_4_4 = new Image2DType(
  next(),
  context => context.UNSIGNED_SHORT_4_4_4_4,
  pixels => new Uint16Array(pixels)
)

Image2DType.UNSIGNED_SHORT_5_5_5_1 = new Image2DType(
  next(),
  context => context.UNSIGNED_SHORT_5_5_5_1,
  pixels => new Uint16Array(pixels)
)

Image2DType.INT = new Image2DType(
  next(),
  context => context.INT,
  pixels => new Int32Array(pixels)
)

Image2DType.UNSIGNED_INT = new Image2DType(
  next(),
  context => context.UNSIGNED_INT,
  pixels => new Uint32Array(pixels)
)

Image2DType.UNSIGNED_INT_24_8_WEBGL = new Image2DType(
  next(),
  context => context.UNSIGNED_INT_24_8_WEBGL,
  pixels => new Uint32Array(pixels)
)

Image2DType.UNSIGNED_INT_2_10_10_10_REV = new Image2DType(
  next(),
  context => context.UNSIGNED_INT_2_10_10_10_REV,
  pixels => new Uint32Array(pixels)
)

Image2DType.UNSIGNED_INT_10F_11F_11F_REV = new Image2DType(
  next(),
  context => context.UNSIGNED_INT_10F_11F_11F_REV,
  pixels => new Uint32Array(pixels)
)

Image2DType.UNSIGNED_INT_5_9_9_9_REV = new Image2DType(
  next(),
  context => context.UNSIGNED_INT_5_9_9_9_REV,
  pixels => new Uint32Array(pixels)
)

Image2DType.UNSIGNED_INT_24_8 = new Image2DType(
  next(),
  context => context.UNSIGNED_INT_24_8,
  pixels => new Uint32Array(pixels)
)

Image2DType.HALF_FLOAT = new Image2DType(
  next(),
  context => context.HALF_FLOAT,
  pixels => new Uint16Array(pixels)
)

Image2DType.FLOAT = new Image2DType(
  next(),
  context => context.FLOAT,
  pixels => new Float32Array(pixels)
)
