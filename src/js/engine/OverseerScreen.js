import { GLView } from '@cedric-demongivert/gl-tool-core'
import { GLToolRenderingSystem, GLToolMeshRenderingSystem } from './systems'

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

    this._renderer = new GLToolRenderingSystem(this._view.context)
    this._systems = this._initializeSystems()

    this.updateScreenSize = this.updateScreenSize.bind(this)
    window.addEventListener('resize', this.updateScreenSize)
    this.updateScreenSize()

    this._manager = null
  }

  _initializeSystems () {
    return [
      this._renderer,
      new GLToolMeshRenderingSystem()
    ]
  }

  get width () {
    return this._element.offsetWidth
  }

  get height () {
    return this._element.offsetHeight
  }

  get map () {
    return this._map
  }

  set map (map) {
    if (this._map !== map) {
      if (this._map != null) {
        for (const system of this._systems) this._map.deleteSystem(system)
        this._map = null
      }

      this._map = map

      if (this._map) {
        for (const system of this._systems) this._map.addSystem(system)
      }
    }
  }

  /**
  * Update the inner view width and height in accordance with its current
  * parent width and height.
  */
  updateScreenSize () {
    if (
      this._view.width !== this._element.offsetWidth ||
      this._view.height !== this._element.offsetHeight
    ) {
      this._view.width = this._element.offsetWidth
      this._view.height = this._element.offsetHeight
      this._renderer.viewport = {
        left: 0,
        bottom: 0,
        width: this.width,
        height: this.height
      }
    }
  }

  /**
  * Render the current screen map.
  *
  * @return {OverseerScreen} The current screen instance for chaining purpose.
  */
  render () {
    if (this._map) {
      this._renderer.render()
    }

    return this
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
