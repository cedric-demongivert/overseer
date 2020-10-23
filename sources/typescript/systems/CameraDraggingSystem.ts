import { Vector4f } from '@cedric-demongivert/gl-tool-math'
import { Component } from '@cedric-demongivert/gl-tool-ecs'

import { MouseButton } from './input'

import { Draggable } from '../components/Draggable'
import { Unit } from '../components/Unit'
import { OrthographicCamera2D } from '../components/OrthographicCamera2D'

import { DraggableType } from '../types/DraggableType'
import { OrthographicCamera2DType } from '../types/OrthographicCamera2DType'

import { MouseManagementSystem } from './input/MouseManagementSystem'
import { MouseSourceSystem } from './input/MouseSourceSystem'

import { UnitManagementSystem } from './UnitManagementSystem'
import { CameraManagementSystem } from './CameraManagementSystem'

import { Cursor } from './input/Cursor'
import { OverseerSystem } from './OverseerSystem'

const GRAB : Cursor[] = [Cursor.GRAB]
const GRABBING : Cursor[] = [Cursor.GRABBING]

export class CameraDraggingSystem extends OverseerSystem {
  private _cameraManagementSystem : CameraManagementSystem
  private _mouseManagementSystem : MouseManagementSystem
  private _unitManagementSystem : UnitManagementSystem
  private readonly _delta : Vector4f

  public constructor () {
    super()
    this._cameraManagementSystem = null
    this._mouseManagementSystem = null
    this._unitManagementSystem = null
    this._delta = new Vector4f()
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  public initialize () {
    this._cameraManagementSystem = this.manager.requireSystem(CameraManagementSystem)
    this._mouseManagementSystem = this.manager.requireSystem(MouseManagementSystem)
    this._unitManagementSystem = this.manager.requireSystem(UnitManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  public destroy () {
    this._cameraManagementSystem = null
    this._mouseManagementSystem = null
    this._unitManagementSystem = null
  }

  /**
  * @see gltool-ecs/System#update
  */
  public update (_delta : number) : void {
    //this.computeHoveredShapes()

    for (const source of this._mouseManagementSystem.sources) {
      if (this.manager.hasComponent(source.camera.entity, DraggableType)) {
        this.updateDraggableCamera(source)
      }
    }
  }

  public updateDraggableCamera (source : MouseSourceSystem) : void {
    const draggable : Draggable = this.manager.getComponentOfEntity(source.camera.entity, DraggableType).data

    if (draggable.dragged) {
      this.updateDraggedCamera(source)
    } else {
      this.updateStaticCamera(source)
    }
  }

  public updateDraggedCamera (source : MouseSourceSystem) : void {
    if (this.manager.hasComponent(source.camera.entity, OrthographicCamera2DType)) {
      this.updateDraggedOrthographicCamera2D(source)
    }
  }

  public updateDraggedOrthographicCamera2D (source : MouseSourceSystem) : void {
    const draggable : Draggable = this.manager.getComponentOfEntity(source.camera.entity, DraggableType).data
    const camera2D : OrthographicCamera2D  = this.manager.getComponentOfEntity(source.camera.entity, OrthographicCamera2DType).data
    const delta : Vector4f = this._delta

    if (this._mouseManagementSystem.isUp(MouseButton.MOUSE_BUTTON_1)) {
      draggable.dragged = false
      source.cursor = GRAB
    } else {
      delta.set(this._mouseManagementSystem.x(), this._mouseManagementSystem.y(), 0, 1)
      delta.subtract(draggable.dragOrigin)
      source.camera.data.viewToWorld.multiplyWithVector(delta)

      camera2D.left = draggable.cameraOrigin.x - delta.x
      camera2D.bottom = draggable.cameraOrigin.y - delta.y

      this._cameraManagementSystem.commitOrthographicCamera2D(source.camera.entity)
    }
  }

  public updateStaticCamera (source : MouseSourceSystem) : void {
    //if (this._hoveredShapes.size > 0) return
    //if (this._mouseManagementSystem.x() == null) return

    if (this.manager.hasComponent(source.camera.entity, OrthographicCamera2DType)) {
      this.updateStaticOrthographicCamera2D(source)
    }
  }

  public updateStaticOrthographicCamera2D (source : MouseSourceSystem) : void {
    const camera2D : Component<OrthographicCamera2D> = this.manager.getComponentOfEntity(source.camera.entity, OrthographicCamera2DType)
    const draggable : Component<Draggable> = this.manager.getComponentOfEntity(source.camera.entity, DraggableType)

    if (this._mouseManagementSystem.isDown(MouseButton.MOUSE_BUTTON_1)) {
      draggable.data.dragged = true
      draggable.data.cameraOrigin.set(camera2D.data.left, camera2D.data.bottom, 0, 1)
      draggable.data.dragOrigin.set(this._mouseManagementSystem.x(), this._mouseManagementSystem.y(), 0, 1)
      source.cursor = GRABBING
    } else {
    }
  }
}
