import {
  Texture2D,
  WrapMode,
  BufferedImage2D,
  Image2DFormat
} from '@cedric-demongivert/gl-tool-texture'

function computeGridTexture () {
  const lineWidth = 16
  const halfLineWidth = (lineWidth / 2) >> 0
  const width = 256
  const height = 256

  const canvas = document.createElement('canvas')
  canvas.height = height
  canvas.width = width

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'

  ctx.fillRect(
    0, height - halfLineWidth,
    width, halfLineWidth
  ) // top

  ctx.fillRect(
    width - halfLineWidth, 0,
    halfLineWidth, height - halfLineWidth
  ) // right

  ctx.fillRect(
    0, 0,
    width - halfLineWidth, halfLineWidth
  ) // bottom

  ctx.fillRect(
    0, halfLineWidth,
    halfLineWidth, height - lineWidth
  ) // left

  return ctx.getImageData(0, 0, 256, 256)
}

export const image = new BufferedImage2D(Image2DFormat.RGBA8, 256, 256)

image.pixels.set(computeGridTexture().data)

export const texture = new Texture2D()

texture.wrapX = WrapMode.REPEAT
texture.wrapY = WrapMode.REPEAT

texture.setImage(image, 0)
