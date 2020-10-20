import { ShaderSource } from '@cedric-demongivert/gl-tool-shader'

export namespace DrawingShader {
  export const WORLD_VERTEX : ShaderSource = new ShaderSource()
  WORLD_VERTEX.content = require('../../../shaders/world-drawing.vert')

  export const MODEL_VERTEX : ShaderSource = new ShaderSource()
  MODEL_VERTEX.content = require('../../../shaders/model-drawing.vert')
}
