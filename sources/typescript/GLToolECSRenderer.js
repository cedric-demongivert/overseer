import { GLView } from '@cedric-demongivert/gl-tool-core'
import { GLToolRenderingSystem, GLToolMeshRenderingSystem } from './systems'

export class GLToolECSRenderer {
  /**
  * Create a new Overseer screen.
  *
  * @param {DOMElement} parentElement - The element that contains this screen.
  */
  constructor (parentElement) {
    this._initializeContainer(parentElement)
    this._view = new GLView()
    this._element.appendChild(this._view.element)
    this._entityComponentSystem = null

    this._renderer = new GLToolRenderingSystem()
    this._renderer.context = this._view.context
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

  get entityComponentSystem () {
    return this._entityComponentSystem
  }

  set entityComponentSystem (entityComponentSystem) {
    if (this._entityComponentSystem !== entityComponentSystem) {
      if (this._entityComponentSystem != null) {
        for (const system of this._systems) this._entityComponentSystem.deleteSystem(system)
        this._entityComponentSystem = null
      }

      this._entityComponentSystem = entityComponentSystem

      if (this._entityComponentSystem) {
        for (const system of this._systems) this._entityComponentSystem.addSystem(system)
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
      this._renderer.left = 0
      this._renderer.bottom = 0
      this._renderer.width = this.width
      this._renderer.height = this.height
    }
  }

  /**
  * Render the current entity component system.
  *
  * @return {GLToolRenderer} The current screen instance for chaining purpose.
  */
  render () {
    if (this._entityComponentSystem) {
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
