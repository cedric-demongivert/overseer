import { GLObject, GLProgram, GLUniforms, GLShader } from '@glkit'
import { Geometry2D } from '@overseer'

const VIEW_KEYS = ['left', 'right', 'top', 'bottom']

export class GridProgram extends GLObject {
  /**
  * Create a new grid rendering program.
  *
  * @param {GLContextualised} context - Rendering context of the program.
  * @param {object} configuration - Configuration of the program.
  */
  constructor (context, { fragment, vertex }) {
    super(context)
    this._fragment = this._createFragmentShader(fragment)
    this._vertex = this._createVertexShader(vertex)

    this._program = new GLProgram(context)
    this._program.fragment = this._fragment
    this._program.vertex = this._vertex

    this._program.link()

    this._uniforms = new GLUniforms(this._program)

    this._geometry = Geometry2D.Quad(this)
  }

  /**
  * Create the program fragment shader from a source.
  *
  * @param {string} fragment - The shader source.
  * @return {GLShader.Fragment} The program fragment shader.
  */
  _createFragmentShader (fragment) {
    const shader = new GLShader.Fragment(this)
    shader.source = [
      'precision highp float;',
      '',
      'uniform mat3 gridToView;',
      'uniform mat3 viewToGrid;',
      'uniform float left;',
      'uniform float right;',
      'uniform float top;',
      'uniform float bottom;',
      '',
      '// start -- custom code',
      fragment.replace(/main\s*\(\)\s*{/i, '_main () {'),
      '// end -- custom code',
      '',
      'void main () {',
      '  gl_FragColor = _main();',
      '}'
    ].join('\n')

    return shader
  }

  /**
  * Create the program vertex shader from a source.
  *
  * @param {string} vertex - The shader source.
  * @return {GLShader.Vertex} The program vertex shader.
  */
  _createVertexShader (vertex) {
    const shader = new GLShader.Vertex(this)

    shader.source = [
      'precision highp float;',
      '',
      'attribute vec2 position;',
      'attribute vec2 uv;',
      '',
      'uniform mat3 gridToView;',
      'uniform mat3 viewToGrid;',
      'uniform float left;',
      'uniform float right;',
      'uniform float top;',
      'uniform float bottom;',
      '',
      '// start -- custom code',
      vertex.replace(/main\s*\(\)\s*{/i, '_main () {'),
      '// end -- custom code',
      '',
      'void main () {',
      '  gl_Position = vec4(_main(), 1);',
      '}'
    ].join('\n')

    return shader
  }

  /**
  * Set the current overseer view.
  *
  * @param {View} view - The current overseer view.
  *
  * @return {GridProgram} The current program instance for chaining purpose.
  */
  setView (view) {
    for (const key of VIEW_KEYS) {
      if (key in this._uniforms) {
        this._uniforms[key] = view[key] * view.unit.value
      }
    }

    return this
  }

  /**
  * Render the grid for a view.
  *
  * @param {View} view - View to use for the rendering.
  *
  * @return {GridProgram} The current grid program for chaining purpose.
  */
  render (view) {
    this.setView(view)
    this._geometry.render(this._program)
    return this
  }

  /**
  * Return uniforms of this program.
  *
  * @return {GLUniforms} Uniforms of this program.
  */
  get uniforms () {
    return this._uniforms
  }

  /**
  * Return the underlying program.
  *
  * @return {GLProgram} The underlying program.
  */
  get program () {
    return this._program
  }

  /**
  * @see GLObject#destroy
  */
  destroy () {
    this._program.destroy()
    this._geometry.destroy()
    super.destroy()
  }
}
