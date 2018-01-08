import { GLObject, GLProgram, GLUniforms, GLShader } from '@glkit'

export class MapProgram extends GLObject {
  /**
  * Create a new MapProgram.
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
  }

  _createFragmentShader (fragment) {
    const shader = new GLShader.Fragment()
    shader.source = [
      'precision highp float;',
      '',
      'uniform mat3 localeToWorld;',
      'uniform mat3 worldToLocale;',
      'uniform mat3 worldToCamera;',
      'uniform mat3 cameraToWorld;',
      'uniform mat3 localeToWorldNormal;',
      'uniform mat3 worldToViewNormal;',
      '',
      '// start -- custom code',
      fragment.replace(/main\s*\(\)\s*{/i, '_main () {'),
      '// end -- custom code',
      '',
      'main () {',
      '  gl_FragColor = _main();',
      '}'
    ].join('\n')

    return shader
  }

  _createVertexShader (vertex) {
    const shader = new GLShader.Vertex()
    shader.source = [
      'precision highp float;',
      '',
      'uniform mat3 localeToWorld;',
      'uniform mat3 worldToLocale;',
      'uniform mat3 worldToCamera;',
      'uniform mat3 cameraToWorld;',
      'uniform mat3 localeToWorldNormal;',
      'uniform mat3 worldToViewNormal;',
      '',
      '// start -- custom code',
      vertex.replace(/main\s*\(\)\s*{/i, '_main () {'),
      '// end -- custom code',
      '',
      'main () {',
      '  gl_Position = _main();',
      '}'
    ].join('\n')
  }

  get uniforms () {
    return this._uniforms
  }

  get program () {
    return this._program
  }

  destroy () {
    this._program.destroy()
    super.destroy()
  }
}
