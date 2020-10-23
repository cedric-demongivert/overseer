import { Vector4f } from '@cedric-demongivert/gl-tool-math'
import { Component } from '@cedric-demongivert/gl-tool-ecs'

import { Camera } from '../../components/Camera'
import { Unit } from '../../components/Unit'

import { UnitManagementSystem } from '../UnitManagementSystem'
import { Viewport } from '../Viewport'

import { MouseButton } from './MouseButton'

import { MouseSourceSystem } from './MouseSourceSystem'
import { Cursor } from './Cursor'
import { MouseManagementSystem } from './MouseManagementSystem'

export class DOMMouseSourceSystem extends MouseSourceSystem {
  /**
  * Identifier of the mouse tracked by this source.
  */
  private _unitManagementSystem : UnitManagementSystem

  /**
  * Identifier of the mouse tracked by this source.
  */
  private _identifier : number

  /**
  * Root element used for extracting mouse events.
  */
  private _element : HTMLElement

  /**
  *
  */
  private _oldCursor : Cursor[]

  /**
  *
  */
  private _cursor : Cursor[]

  /**
  * Area of the root element that is used as a source of events.
  */
  private _viewport : Viewport

  /**
  * Camera used for translating screen-space locations to world-space locations.
  */
  private _camera : Component<Camera>

  /**
  *
  */
  private readonly _location : Vector4f

  /**
  * Instantiate a new event source based uppon a DOM element.
  *
  * @param configuration - Configuration of the source.
  */
  public constructor (configuration : DOMMouseSourceSystem.Configuration) {
    super()

    const finalConfiguration : DOMMouseSourceSystem.Configuration = Object.assign({
      x: 0,
      y: 0,
      width: configuration.element.clientWidth,
      height: configuration.element.clientHeight
    }, configuration)

    this._identifier = finalConfiguration.identifier
    this._element = finalConfiguration.element

    this._oldCursor = null
    this._cursor = null
    this._viewport = new Viewport()

    this._viewport.left = finalConfiguration.x
    this._viewport.right = finalConfiguration.x + finalConfiguration.width
    this._viewport.bottom = finalConfiguration.y
    this._viewport.top = finalConfiguration.y + finalConfiguration.height

    this._camera = finalConfiguration.camera

    this._location = new Vector4f()
    this._location.w = 1.0

    this.handleWheel = this.handleWheel.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  public setIdentifier (identifier : number) : void {
    this._identifier = identifier
  }

  public setCamera (camera : Component<Camera>) : void {
    this._camera = camera
  }

  public setViewport (x : number, y : number, width : number, height : number) : void {
    this._viewport.left = x
    this._viewport.right = x + width
    this._viewport.bottom = y
    this._viewport.top = y + height
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System.initialize
  */
  public initialize () : void {
    super.initialize()

    this._unitManagementSystem = this.manager.requireSystem(UnitManagementSystem)

    this._oldCursor = Cursor.getFromElement(this._element)
    this._cursor = this._oldCursor

    this._element.addEventListener('wheel', this.handleWheel, { passive: true })
    //this._element.addEventListener('click', this.handleClick)
    this._element.addEventListener('mousemove', this.handleMove)
    this._element.addEventListener('mouseup', this.handleMouseUp)
    this._element.addEventListener('mousedown', this.handleMouseDown)
  }

  /**
  * @see cedric-demongivert/gl-tool-ecs/System.destroy
  */
  public destroy () : void {
    super.destroy()

    Cursor.setToElement(this._oldCursor, this._element)
    this._oldCursor = null
    this._cursor = null

    this._element.removeEventListener('wheel', this.handleWheel)
    //this._element.removeEventListener('click', this.handleClick)
    this._element.removeEventListener('mousemove', this.handleMove)
    this._element.removeEventListener('mouseup', this.handleMouseUp)
    this._element.removeEventListener('mousedown', this.handleMouseDown)

    this._unitManagementSystem = null
  }

  /**
  * @see MouseSource.get camera
  */
  public get camera () : Component<Camera> {
    return this._camera
  }

  /**
  * @see MouseSource.get identifier
  */
  public get identifier () : number {
    return this._identifier
  }

  /**
  * @return The DOM element used as a source.
  */
  public get element () : HTMLElement {
    return this._element
  }

  /**
  * @see MouseSource.get cursor
  */
  public get cursor () : Cursor[] {
    return this._cursor
  }

  /**
  * @see MouseSource.set cursor
  */
  public set cursor (cursor : Cursor[]) {
    this._cursor = cursor
    Cursor.setToElement(this._cursor, this._element)
  }

  public handleWheel (event : WheelEvent) : void {
  }

  private extractMouseLocation (event : MouseEvent) : void {
    const clientRect : DOMRect = this._element.getBoundingClientRect()

    this._location.x = event.clientX - clientRect.x
    this._location.y = clientRect.height - event.clientY + clientRect.y
  }

  private isTrackedMouseLocation () : boolean {
    return this._viewport.contains(this._location.x, this._location.y)
  }

  /**
  * Handle a mouse up event emitted from the DOM.
  *
  * @param event - A mouse up event to convert and publish.
  */
  public handleMouseUp (event : MouseEvent) : void {
    this.extractMouseLocation(event)

    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        if (this.isTrackedMouseLocation()) {
          (system as MouseManagementSystem).handleState(
            this, event.timeStamp, event.buttons
          )
        } else {
          (system as MouseManagementSystem).handleState(
            this, event.timeStamp, MouseButton.NONE
          )
        }
      }
    }
  }

  /**
  * Handle a mouse down event emitted from the DOM.
  *
  * @param event - A mouse down event to convert and publish.
  */
  public handleMouseDown (event : MouseEvent) : void {
    this.extractMouseLocation(event)

    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        if (this.isTrackedMouseLocation()) {
          (system as MouseManagementSystem).handleState(
            this, event.timeStamp, event.buttons
          )
        } else {
          (system as MouseManagementSystem).handleState(
            this, event.timeStamp, MouseButton.NONE
          )
        }
      }
    }
  }

  private toClipSpaceLocation () : void {
    const viewport : Viewport = this._viewport

    this._location.x = (this._location.x - viewport.left) / viewport.width
    this._location.y = (this._location.y - viewport.bottom) / viewport.height

    this._location.x = this._location.x * 2 - 1.0
    this._location.y = this._location.y * 2 - 1.0
  }

  private toValidMouseLocation () : void {
    const viewport : Viewport = this._viewport

    this._location.x = Math.max(
      Math.min(this._location.x, viewport.right),
      viewport.left
    )

    this._location.y = Math.max(
      Math.min(this._location.y, viewport.top),
      viewport.bottom
    )
  }

  /**
  * Handle a mouse move event emitted from the DOM.
  *
  * @param event - A mouse move event to convert and publish.
  */
  public handleMove (event : MouseEvent) : void {
    this.extractMouseLocation(event)
    this.toValidMouseLocation()
    this.toClipSpaceLocation()

    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (MouseManagementSystem.is(system)) {
        (system as MouseManagementSystem).handleMove(
          this, event.timeStamp, this._location.x, this._location.y
        )
      }
    }
  }
}

export namespace DOMMouseSourceSystem {
  /**
  * Configuration object used in order to create a mouse source system.
  */
  export type Configuration = {
    identifier: number,
    element: HTMLElement,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    camera: Component<Camera>
  }
}
