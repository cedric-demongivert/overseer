import { MouseSourceSystem } from './MouseSourceSystem'
import * as Cursor from './Cursor'
import { MouseManagementSystem } from './MouseManagementSystem'

export class DOMMouseSourceSystem extends MouseSourceSystem {
  /**
  * Instantiate a new mouse source system.
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

    this.handleWheel = this.handleWheel.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleMove = this.handleMove.bind(this)
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System#initialize
  */
  initialize () {
    super.initialize()

    this._oldCursor = Cursor.getFromElement(this._element)
    this._cursor = this._oldCursor

    this._element.addEventListener('wheel', this.handleWheel, { passive: true })
    this._element.addEventListener('click', this.handleClick)
    this._element.addEventListener('mousemove', this.handleMove)
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System#destroy
  */
  destroy () {
    super.destroy()

    Cursor.setToElement(this._oldCursor, this._element)
    this._oldCursor = null
    this._cursor = null

    this._element.removeEventListener('wheel', this.handleWheel)
    this._element.removeEventListener('click', this.handleClick)
    this._element.removeEventListener('mousemove', this.handleMove)
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

  handleClick (event) {
    this.cursor = [Cursor.POINTER]
  }

  handleMove (event) {
    const systems = this.manager.systems

    const screenX = ((event.clientX / this._element.scrollWidth) - 0.5) * 2.0
    const screenY = ((event.clientY / this._element.scrollHeight) - 0.5) * 2.0

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        system.handleMove(this._identifier, event.timeStamp, screenX, -screenY)
      }
    }
  }
}
