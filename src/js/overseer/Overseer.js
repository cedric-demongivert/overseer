import { GLView, GLShader, GLProgram, Matrix3f, GLUniforms } from '@glkit'
import { View, SquareGrid, Geometry2D } from '@overseer/engine'

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
    this._camera = new View(
      -this._element.offsetWidth / 2,
      this._element.offsetWidth / 2,
      -this._element.offsetHeight / 2,
      this._element.offsetHeight / 2
    )
    this._grid = new SquareGrid(this._view, '3m')
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

    this._camera.centerX = 60 * delta / 1000
    this._camera.centerY = 60 * delta / 1000

    gl.viewport(0, 0, this._view.width, this._view.height)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    this._grid.render(this._camera)

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
