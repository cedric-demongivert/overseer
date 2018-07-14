export class Image2DUnsizedFormat {
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

let nextIdentifier = 1
const next = () => nextIdentifier ++

Image2DUnsizedFormat.RGBA = new Image2DUnsizedFormat(
  next(), context => context.RGBA
)

Image2DUnsizedFormat.RGBA_INTEGER = new Image2DUnsizedFormat(
  next(), context => context.RGBA_INTEGER
)

Image2DUnsizedFormat.RGB = new Image2DUnsizedFormat(
  next(), context => context.RGB
)

Image2DUnsizedFormat.RED = new Image2DUnsizedFormat(
  next(), context => context.RED
)

Image2DUnsizedFormat.RED_INTEGER = new Image2DUnsizedFormat(
  next(), context => context.RED
)

Image2DUnsizedFormat.RG = new Image2DUnsizedFormat(
  next(), context => context.RG
)

Image2DUnsizedFormat.RG_INTEGER = new Image2DUnsizedFormat(
  next(), context => context.RG
)

Image2DUnsizedFormat.LUMINANCE_ALPHA = new Image2DUnsizedFormat(
  next(), context => context.LUMINANCE_ALPHA
)

Image2DUnsizedFormat.LUMINANCE = new Image2DUnsizedFormat(
  next(), context => context.LUMINANCE
)

Image2DUnsizedFormat.ALPHA = new Image2DUnsizedFormat(
  next(), context => context.ALPHA
)
