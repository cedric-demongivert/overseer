import { Viewport } from '../../components'

import { MouseSourceSystem } from './MouseSourceSystem'
import * as Cursor from './Cursor'
import { MouseManagementSystem } from './MouseManagementSystem'

export class DOMMouseSourceSystem extends MouseSourceSystem {
  /**
  * Instantiate a new event source based uppon a DOM element.
  *
  * @param {DOMElement} element - The dom element used as an event source.
  * @param {number} [identifier = 0] - Identifier of the mouse tracked by this source.
  */
  constructor (element, identifier = 0) {
    super()

    this._identifier = identifier
    this._element = element

    this._oldCursor = null
    this._cursor = null
    this._viewports = null

    this.handleWheel = this.handleWheel.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System#initialize
  */
  initialize () {
    super.initialize()

    this._oldCursor = Cursor.getFromElement(this._element)
    this._cursor = this._oldCursor

    this._viewports = this.manager.getEntitiesWithType(Viewport)

    this._element.addEventListener('wheel', this.handleWheel, { passive: true })
    this._element.addEventListener('click', this.handleClick)
    this._element.addEventListener('mousemove', this.handleMove)
    this._element.addEventListener('mouseup', this.handleMouseUp)
    this._element.addEventListener('mousedown', this.handleMouseDown)
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System#destroy
  */
  destroy () {
    super.destroy()

    Cursor.setToElement(this._oldCursor, this._element)
    this._oldCursor = null
    this._cursor = null
    this._viewports = null

    this._element.removeEventListener('wheel', this.handleWheel)
    this._element.removeEventListener('click', this.handleClick)
    this._element.removeEventListener('mousemove', this.handleMove)
    this._element.removeEventListener('mouseup', this.handleMouseUp)
    this._element.removeEventListener('mousedown', this.handleMouseDown)
  }

  /**
  * @see MouseSource#get identifier
  */
  get identifier () {
    return this._identifier
  }

  /**
  * @return {DOMElement} The DOM element used as a source.
  */
  get element () {
    return this._element
  }

  /**
  * @see MouseSource#get cursor
  */
  get cursor () {
    return this._cursor
  }

  /**
  * @see MouseSource#set cursor
  */
  set cursor (cursor) {
    this._cursor = cursor
    Cursor.setToElement(this._cursor, this._element)
  }

  handleWheel (event) {
  }

  /**
  * Handle a mouse up event emitted from the DOM.
  *
  * @param {MouseEvent} event - A mouse up event to convert and publish.
  */
  handleMouseUp (event) {
    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        system.handleState(this._identifier, event.timeStamp, event.buttons)
      }
    }
  }

  /**
  * Handle a mouse down event emitted from the DOM.
  *
  * @param {MouseEvent} event - A mouse down event to convert and publish.
  */
  handleMouseDown (event) {
    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        system.handleState(this._identifier, event.timeStamp, event.buttons)
      }
    }
  }

  /**
  * Handle a mouse move event emitted from the DOM.
  *
  * @param {MouseEvent} event - A mouse move event to convert and publish.
  */
  handleMove (event) {
    const viewports = this._viewports

    for (let index = 0, size = viewports.size; index < size; ++index) {
      const viewport = this.manager.getInstance(viewports.get(index), Viewport)

      if (viewport.contains(event.clientX, event.clientY)) {
        this.handleViewportMove(viewport, event)
      }
    }
  }

  /**
  * Handle a mouse move event emitted from the DOM for a given viewport.
  *
  * @param {Viewport} viewport - Viewport to use for handling the given event.
  * @param {MouseEvent} event - A mouse move event to convert and publish.
  */
  handleViewportMove (viewport, event) {
    const viewToWorld = viewport.camera.viewToWorld

    const screenX = viewport.toScreenXCoordinate(event.clientX)
    const screenY = viewport.toScreenYCoordinate(event.clientY)

    this.publishMove(event.timeStamp, viewport, screenX, -screenY)
  }

  /**
  * Publish a move event to all registered mouse management system.
  *
  * @param {number} timestamp - Timestamp of the emission of the event.
  * @param {Viewport} viewport - Active viewport.
  * @param {number} x - Abscissa location of the move in screen space.
  * @param {number} y - Ordinate location of the move in screen space.
  */
  publishMove (timestamp, viewport, x, y) {
    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        system.handleMove(this._identifier, timestamp, viewport, x, y)
      }
    }
  }
}
