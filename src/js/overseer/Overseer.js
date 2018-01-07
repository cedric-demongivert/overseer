import {
  GLView, GLShader, GLProgram, Matrix3f, GLUniforms
} from '../engine'
import { OrthographicCamera2D } from '../camera'
import { SquareGrid } from '../grid'

import { Geometry2D } from './Geometry2D'

export class Overseer {
  /**
  * Create a new Overseer map context.
  *
  * @param {DOMElement} parentElement - The element that contains this context.
  */
  constructor (parentElement) {
    this._initializeContainer(parentElement)
    this._view = new GLView()
    this._element.appendChild(this._view.element)
    this.update = this.update.bind(this)

    this._currentFrame = window.requestAnimationFrame(this.update)
    this.initialize()
  }

  initialize () {
    const vshader = new GLShader.Vertex(this._view)
    vshader.source = require('@shaders/basic.vert')
    const fshader = new GLShader.Fragment(this._view)
    fshader.source = require('@shaders/basic.frag')
    this._program = new GLProgram(this._view)
    this._program.vertex = vshader
    this._program.fragment = fshader
    this._program.link()

    const tvshader = new GLShader.Vertex(this._view)
    tvshader.source = require('@shaders/texture.vert')
    const tfshader = new GLShader.Fragment(this._view)
    tfshader.source = require('@shaders/texture.frag')
    this._tprogram = new GLProgram(this._view)
    this._tprogram.vertex = tvshader
    this._tprogram.fragment = tfshader
    this._tprogram.link()

    this._uniforms = new GLUniforms(this._tprogram)

    this._geometry = new Geometry2D(this._view)
    const s = 2000
    this._geometry.positions.set(0,
      [-0.5 * s, -0.5 * s],
      [-0.5 * s, +0.5 * s],
      [+0.5 * s, +0.5 * s],
      [+0.5 * s, -0.5 * s]
    )
    this._geometry.colors.set(0,
      [0, 0, 0, 1],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1]
    )
    const n = 100
    this._geometry.uvs.set(0,
      [0, 0],
      [0, n],
      [n, n],
      [n, 0]
    )

    this._geometry.faces.push(0, 1, 2, 3, 2, 0)
    this._geometry.commit(this._view.context.STATIC_DRAW)

    this._texture = new SquareGrid(this._view)

    this._camera = new OrthographicCamera2D(
      -this._element.offsetWidth / 2,
      this._element.offsetWidth / 2,
      -this._element.offsetHeight / 2,
      this._element.offsetHeight / 2
    )
  }

  /**
  * Update the view size.
  */
  updateSize () {
    if (
      this._view.width !== this._element.offsetWidth ||
      this._view.height !== this._element.offsetHeight
    ) {
      this._view.width = this._element.offsetWidth
      this._view.height = this._element.offsetHeight
      this._camera.width = this._view.width
      this._camera.height = this._view.height
    }
  }

  update (delta) {
    this.updateSize()
    const gl = this._view.context

    gl.viewport(0, 0, this._view.width, this._view.height)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    this._uniforms.localeToWorld = Matrix3f.identity
    this._uniforms.worldToCamera = this._camera.worldToCamera
    this._uniforms.colors = this._texture

    this._geometry.render(this._tprogram)

    this._currentFrame = window.requestAnimationFrame(this.update)
  }

  /**
  * Create the overseer container element.
  *
  * @param {DOMElement} rootElement - The element that contains the container.
  */
  _initializeContainer (parentElement) {
    this._element = parentElement.ownerDocument.createElement('div')

    this._element.style = [
      'display: block',
      'position: relative',
      'width: 100%',
      'height: 100%',
      'margin: 0px',
      'padding: 0px',
      'border: none',
      'box-sizing: border-box',
      'overflow: hidden'
    ].join(';')

    parentElement.appendChild(this._element)
  }

  get element () {
    return this._element
  }

  get view () {
    return this._view
  }

  destroy () {
    window.cancelAnimationFrame(this._currentFrame)
    this._currentFrame = null
    this._view.destroy()
    this._element.parentNode.removeChild(this._element)

    window.removeEventListener(this.updateSize)
  }
}
