import { ShaderSource } from '@cedric-demongivert/gl-tool-shader'

export namespace GridShader {
  export const VERTEX : ShaderSource = new ShaderSource()
  VERTEX.content = require('../../../shaders/grid/grid.vert').default

  export const SQUARE : ShaderSource = new ShaderSource()
  SQUARE.content = require('../../../shaders/grid/square-grid.frag').default
}
