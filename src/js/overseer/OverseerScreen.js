import { GLView } from '@glkit'

export class OverseerScreen {
  /**
  * Create a new Overseer screen.
  *
  * @param {DOMElement} parentElement - The element that contains this screen.
  */
  constructor (parentElement) {
    this._initializeContainer(parentElement)
    this._view = new GLView()
    this._element.appendChild(this._view.element)
    this._map = null

    this._manager = null
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

  /**
  * @param {number} delta
  */
  update (delta) {
    /*const view = this._view

    this.updateSize()

    this._camera.unit = new Length('1m').divide(60).multiply(Math.exp(delta / 10000))
    //this._camera.centerX = 60 * delta / 1000
    //this._camera.centerY = 60 * delta / 1000

    view.$viewport(0, 0, view.width, view.height)

    view.$clearColor(1.0, 1.0, 1.0, 1.0)
    view.$clear(view.$COLOR_BUFFER_BIT | view.$DEPTH_BUFFER_BIT)

    this._grid.render(this._camera)

    this._currentFrame = window.requestAnimationFrame(this.update)*/
  }

  /**
  * Create the overseer container element.
  *
  * @param {DOMElement} parentElement - The element that contains the container.
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

  destroy () {
    this._view.destroy()
    this._element.parentNode.removeChild(this._element)

    window.removeEventListener(this.updateSize)
  }
}
