export class Image2DSizedFormat {
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

Image2DSizedFormat.R8 = new Image2DSizedFormat(
  1, context => context.R8
)

Image2DSizedFormat.R8_SNORM = new Image2DSizedFormat(
  2, context => context.R8_SNORM
)

Image2DSizedFormat.RG8 = new Image2DSizedFormat(
  3, context => context.RG8
)

Image2DSizedFormat.RG8_SNORM = new Image2DSizedFormat(
  4, context => context.RG8_SNORM
)

Image2DSizedFormat.RGB8 = new Image2DSizedFormat(
  5, context => context.RGB8
)

Image2DSizedFormat.RGB8_SNORM = new Image2DSizedFormat(
  6, context => context.RGB8_SNORM
)

Image2DSizedFormat.RGB565 = new Image2DSizedFormat(
  7, context => context.RGB565
)

Image2DSizedFormat.RGBA4 = new Image2DSizedFormat(
  8, context => context.RGBA4
)

Image2DSizedFormat.RGB5_A1 = new Image2DSizedFormat(
  9, context => context.RGB5_A1
)

Image2DSizedFormat.RGBA8 = new Image2DSizedFormat(
  10, context => context.RGBA8
)

Image2DSizedFormat.RGBA8_SNORM = new Image2DSizedFormat(
  11, context => context.RGBA8_SNORM
)

Image2DSizedFormat.RGB10_A2 = new Image2DSizedFormat(
  12, context => context.RGB10_A2
)

Image2DSizedFormat.RGB10_A2UI = new Image2DSizedFormat(
  13, context => context.RGB10_A2UI
)

Image2DSizedFormat.SRGB8 = new Image2DSizedFormat(
  14, context => context.SRGB8
)

Image2DSizedFormat.SRGB8_ALPHA8 = new Image2DSizedFormat(
  15, context => context.SRGB8_ALPHA8
)

Image2DSizedFormat.R16F = new Image2DSizedFormat(
  16, context => context.R16F
)

Image2DSizedFormat.RG16F = new Image2DSizedFormat(
  17, context => context.RG16F
)

Image2DSizedFormat.RGB16F = new Image2DSizedFormat(
  18, context => context.RGB16F
)

Image2DSizedFormat.RGBA16F = new Image2DSizedFormat(
  19, context => context.RGBA16F
)

Image2DSizedFormat.R32F = new Image2DSizedFormat(
  20, context => context.R32F
)

Image2DSizedFormat.RG32F = new Image2DSizedFormat(
  21, context => context.RG32F
)

Image2DSizedFormat.RGB32F = new Image2DSizedFormat(
  22, context => context.RGB32F
)

Image2DSizedFormat.RGBA32F = new Image2DSizedFormat(
  23, context => context.RGBA32F
)

Image2DSizedFormat.R11F_G11F_B10F = new Image2DSizedFormat(
  24, context => context.R11F_G11F_B10F
)

Image2DSizedFormat.RGB9_E5 = new Image2DSizedFormat(
  25, context => context.RGB9_E5
)

Image2DSizedFormat.R8I = new Image2DSizedFormat(
  26, context => context.R8I
)

Image2DSizedFormat.R8UI = new Image2DSizedFormat(
  27, context => context.R8UI
)

Image2DSizedFormat.R16I = new Image2DSizedFormat(
  28, context => context.R16I
)

Image2DSizedFormat.R16UI = new Image2DSizedFormat(
  29, context => context.R16UI
)

Image2DSizedFormat.R32I = new Image2DSizedFormat(
  30, context => context.R32I
)

Image2DSizedFormat.R32UI = new Image2DSizedFormat(
  31, context => context.R32UI
)

Image2DSizedFormat.RG8I = new Image2DSizedFormat(
  32, context => context.RG8I
)

Image2DSizedFormat.RG8UI = new Image2DSizedFormat(
  33, context => context.RG8UI
)

Image2DSizedFormat.RG16I = new Image2DSizedFormat(
  34, context => context.RG16I
)

Image2DSizedFormat.RG16UI = new Image2DSizedFormat(
  35, context => context.RG16UI
)

Image2DSizedFormat.RG32I = new Image2DSizedFormat(
  36, context => context.RG32I
)

Image2DSizedFormat.RG32UI = new Image2DSizedFormat(
  37, context => context.RG32UI
)

Image2DSizedFormat.RGB8I = new Image2DSizedFormat(
  38, context => context.RGB8I
)

Image2DSizedFormat.RGB8UI = new Image2DSizedFormat(
  39, context => context.RGB8UI
)

Image2DSizedFormat.RGB16I = new Image2DSizedFormat(
  40, context => context.RGB16I
)

Image2DSizedFormat.RGB16UI = new Image2DSizedFormat(
  41, context => context.RGB16UI
)

Image2DSizedFormat.RGB32I = new Image2DSizedFormat(
  42, context => context.RGB32I
)

Image2DSizedFormat.RGB32UI = new Image2DSizedFormat(
  43, context => context.RGB32UI
)

Image2DSizedFormat.RGBA8I = new Image2DSizedFormat(
  44, context => context.RGBA8I
)

Image2DSizedFormat.RGBA8UI = new Image2DSizedFormat(
  45, context => context.RGBA8UI
)

Image2DSizedFormat.RGBA16I = new Image2DSizedFormat(
  46, context => context.RGBA16I
)

Image2DSizedFormat.RGBA16UI = new Image2DSizedFormat(
  47, context => context.RGBA16UI
)

Image2DSizedFormat.RGBA32I = new Image2DSizedFormat(
  48, context => context.RGBA32I
)

Image2DSizedFormat.RGBA32UI = new Image2DSizedFormat(
  49, context => context.RGBA32UI
)
