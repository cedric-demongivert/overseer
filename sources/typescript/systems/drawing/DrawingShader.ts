import { ShaderSource } from '@cedric-demongivert/gl-tool-shader'

export namespace DrawingShader {
  export const MODEL_VERTEX : ShaderSource = new ShaderSource()
  MODEL_VERTEX.content = require('../../../shaders/model-drawing.vert').default
}
