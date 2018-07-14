import { Image2DType as Type } from './Image2DType'
import { Image2DUnsizedFormat as Unsized } from './Image2DUnsizedFormat'
import { Image2DSizedFormat as Sized } from './Image2DSizedFormat'

export class Image2DFormat {
  constructor (sizedFormat, unsizedFormat, type) {
    this._sizedFormat = sizedFormat
    this._unsizedFormat = unsizedFormat
    this._type = type
  }

  get sizedFormat () {
    return this._sizedFormat
  }

  get unsizedFormat () {
    return this._unsizedFormat
  }

  get type () {
    return this._type
  }

  allocate (pixels) {
    return this._type.allocate(pixels)
  }
}

ImageFormat.UNSIGNED_BYTE_RGB = new ImageFormat(
  Unsized.RGB, Unsized.RGB, Type.UNSIGNED_BYTE
)

ImageFormat.UNSIGNED_SHORT_565_RGB = new ImageFormat(
  Unsized.RGB, Unsized.RGB, Type.UNSIGNED_SHORT_5_6_5
)

ImageFormat.UNSIGNED_BYTE_RGBA = new ImageFormat(
  Unsized.RGBA, Unsized.RGBA, Type.UNSIGNED_BYTE
)

ImageFormat.UNSIGNED_SHORT_4444_RGBA = new ImageFormat(
  Unsized.RGBA, Unsized.RGBA, Type.UNSIGNED_SHORT_4_4_4_4
)

ImageFormat.UNSIGNED_SHORT_5551_RGBA = new ImageFormat(
  Unsized.RGBA, Unsized.RGBA, Type.UNSIGNED_SHORT_5_5_5_1
)

ImageFormat.UNSIGNED_BYTE_LUMINANCE_ALPHA = new ImageFormat(
  Unsized.LUMINANCE_ALPHA, Unsized.LUMINANCE_ALPHA, Type.UNSIGNED_BYTE
)

ImageFormat.UNSIGNED_BYTE_LUMINANCE = new ImageFormat(
  Unsized.LUMINANCE, Unsized.LUMINANCE, Type.UNSIGNED_BYTE
)

ImageFormat.UNSIGNED_BYTE_ALPHA = new ImageFormat(
  Unsized.ALPHA, Unsized.ALPHA, Type.UNSIGNED_BYTE
)

ImageFormat.UNSIGNED_BYTE_R8 = new ImageFormat(
  Sized.R8, Unsized.RED, Type.UNSIGNED_BYTE
)

ImageFormat.HALF_R16F = new ImageFormat(
  Sized.R16F, Unsized.RED, Type.HALF_FLOAT
)

ImageFormat.R16F = new ImageFormat(
  Sized.R16F, Unsized.RED, Type.FLOAT
)

ImageFormat.R32F = new ImageFormat(
  Sized.R32F, Unsized.RED, Type.FLOAT
)

ImageFormat.R8UI = new ImageFormat(
  Sized.R8UI, Unsized.RED_INTEGER, Type.UNSIGNED_BYTE
)

ImageFormat.RG8 = new ImageFormat(
  Sized.RG8, Unsized.RG, Type.UNSIGNED_BYTE
)

ImageFormat.HALF_RG16F = new ImageFormat(
  Sized.RG16F, Unsized.RG, Type.HALF_FLOAT
)

ImageFormat.RG16F = new ImageFormat(
  Sized.RG16F, Unsized.RG, Type.FLOAT
)

ImageFormat.RG32F = new ImageFormat(
  Sized.RG32F, Unsized.RG, Type.FLOAT
)

ImageFormat.RG8UI = new ImageFormat(
  Sized.RG8UI, Unsized.RG_INTEGER, Type.UNSIGNED_BYTE
)

ImageFormat.RGB8 = new ImageFormat(
  Sized.RGB8, Unsized.RGB, Type.UNSIGNED_BYTE
)

ImageFormat.SRGB8 = new ImageFormat(
  Sized.SRGB8, Unsized.RGB, Type.UNSIGNED_BYTE
)

ImageFormat.RGB565 = new ImageFormat(
  Sized.RGB565, Unsized.RGB, Type.UNSIGNED_BYTE
)

ImageFormat.SHORT_RGB565 = new ImageFormat(
  Sized.RGB565, Unsized.RGB, Type.UNSIGNED_SHORT_5_6_5
)

ImageFormat.R11F_G11F_B10F = new ImageFormat(
  Sized.R11F_G11F_B10F, Unsized.RGB, Type.FLOAT
)

ImageFormat.HALF_R11F_G11F_B10F = new ImageFormat(
  Sized.R11F_G11F_B10F, Unsized.RGB, Type.HALF_FLOAT
)

ImageFormat.INT_R11F_G11F_B10F = new ImageFormat(
  Sized.R11F_G11F_B10F, Unsized.RGB, Type.UNSIGNED_INT_10F_11F_11F_REV
)

ImageFormat.RGB9_E5 = new ImageFormat(
  Sized.RGB9_E5, Unsized.RGB, Type.FLOAT
)

ImageFormat.HALF_RGB9_E5 = new ImageFormat(
  Sized.RGB9_E5, Unsized.RGB, Type.HALF_FLOAT
)

ImageFormat.RGB16F = new ImageFormat(
  Sized.RGB16F, Unsized.RGB, Type.FLOAT
)

ImageFormat.HALF_RGB16F = new ImageFormat(
  Sized.RGB16F, Unsized.RGB, Type.HALF_FLOAT
)

ImageFormat.RGB32F = new ImageFormat(
  Sized.RGB32F, Unsized.RGB, Type.FLOAT
)

ImageFormat.RGB8UI = new ImageFormat(
  Sized.RGB8UI, Unsized.RGB, Type.UNSIGNED_BYTE
)

ImageFormat.RGBA8 = new ImageFormat(
  Sized.RGBA8, Unsized.RGBA, Type.UNSIGNED_BYTE
)

ImageFormat.SRGB8_ALPHA8 = new ImageFormat(
  Sized.SRGB8_ALPHA8, Unsized.RGBA, Type.UNSIGNED_BYTE
)

ImageFormat.RGB5_A1 = new ImageFormat(
  Sized.RGB5_A1, Unsized.RGBA, Type.UNSIGNED_BYTE
)

ImageFormat.SHORT_RGB5_A1 = new ImageFormat(
  Sized.RGB5_A1, Unsized.RGBA, Type.UNSIGNED_SHORT_5_5_5_1
)

ImageFormat.RGB10_A2 = new ImageFormat(
  Sized.RGB10_A2, Unsized.RGBA, Type.UNSIGNED_INT_2_10_10_10_REV
)

ImageFormat.RGBA4 = new ImageFormat(
  Sized.RGBA4, Unsized.RGBA, Type.UNSIGNED_BYTE
)

ImageFormat.SHORT_RGBA4 = new ImageFormat(
  Sized.RGBA4, Unsized.RGBA, Type.UNSIGNED_SHORT_4_4_4_4
)

ImageFormat.HALF_RGBA16F = new ImageFormat(
  Sized.RGBA16F, Unsized.RGBA, Type.HALF_FLOAT
)

ImageFormat.RGBA16F = new ImageFormat(
  Sized.RGBA16F, Unsized.RGBA, Type.FLOAT
)

ImageFormat.RGBA32F = new ImageFormat(
  Sized.RGBA32F, Unsized.RGBA, Type.FLOAT
)

ImageFormat.RGBA8UI = new ImageFormat(
  Sized.RGBA8UI, Unsized.RGBA_INTEGER, Type.UNSIGNED_BYTE
)
