import { Packs } from '@cedric-demongivert/gl-tool-collection'

import { MouseButton } from './input'
import { Draggable } from '../components/Draggable'
import { Camera } from '../components/Camera'
import { OrthographicCamera2D } from '../components/OrthographicCamera2D'

import { CameraManagementSystem } from './CameraManagementSystem'
import { MouseManagementSystem } from './input/MouseManagementSystem'
import { ShapeManagementSystem } from './shapes/ShapeManagementSystem'
import { UnitManagementSystem } from './UnitManagementSystem'

import { OverseerSystem } from './OverseerSystem'

export class Camera2DDraggingSystem extends OverseerSystem {
  constructor () {
    super()
    this._cameras = null
    this._shapes = null
    this._mouse = null
    this._units = null
    this._entitiesWithCamera = null
    this._hoveredShapes = Packs.uint32(16)
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._cameras = this.manager.requireSystem(CameraManagementSystem)
    this._shapes = this.manager.requireSystem(ShapeManagementSystem)
    this._mouse = this.manager.requireSystem(MouseManagementSystem)
    this._units = this.manager.requireSystem(UnitManagementSystem)
    this._entitiesWithCamera = this.manager.getEntitiesWithType(
      OrthographicCamera2D
    )
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._cameras = null
    this._shapes = null
    this._mouse = null
    this._units = null
    this._entitiesWithCamera = null
  }

  computeHoveredShapes () {
    this._hoveredShapes.clear()

    if (this._mouse.x() != null) {
      this._shapes.getBoundingShapesAt(
        this._mouse.worldX(), this._mouse.worldY(), 0, 1,
        this._hoveredShapes
      )
    }
  }

  /**
  * @see gltool-ecs/System#update
  */
  update (delta) {
    this.computeHoveredShapes()

    const entities = this._entitiesWithCamera

    for (let index = 0, size = entities.size; index < size; ++index) {
      const entity = entities.get(index)

      if (this.manager.hasComponent(entity, Draggable)) {
        this.updateDraggableCamera(entity, delta)
      }
    }
  }

  updateDraggableCamera (entity, delta) {
    const draggable = this.manager.getInstance(entity, Draggable)

    if (draggable.isDragged) {
      this.updateDraggedCamera(entity, delta)
    } else {
      this.updateStaticCamera(entity, delta)
    }
  }

  updateDraggedCamera (entity, delta) {
    const draggable = this.manager.getInstance(entity, Draggable)
    const camera2D = this.manager.getInstance(entity, OrthographicCamera2D)
    const camera = this.manager.getInstance(entity, Camera)

    console.log('updateDraggedCamera ' + entity)

    if (this._mouse.isUp(MouseButton.PRIMARY)) {
      draggable.setDragged(false)
    } else {
      const currentX = this._mouse.x()
      const originX = draggable.origin.x
      const currentY = this._mouse.y()
      const originY = draggable.origin.y

      const moveX = camera.viewToWorld.computeXComponentOfMultiplicationWithVector((currentX - originX), 0.0, 0.0, 0.0)
      const moveY = camera.viewToWorld.computeYComponentOfMultiplicationWithVector(0.0, (currentY - originY), 0.0, 0.0)

      camera2D.setLeft(draggable.cameraOrigin.x - moveX)
      camera2D.setBottom(draggable.cameraOrigin.y - moveY)

      this._cameras.commit(entity)
    }
  }

  updateStaticCamera (entity, delta) {
    if (this._hoveredShapes.size > 0) return
    if (this._mouse.x() == null) return

    const camera = this.manager.getInstance(entity, Camera)

    if (this._mouse.viewport().camera !== camera) return

    const camera2D = this.manager.getInstance(entity, OrthographicCamera2D)
    const draggable = this.manager.getInstance(entity, Draggable)

    if (this._mouse.isUp(MouseButton.PRIMARY)) {

    } else if (this._mouse.isDown(MouseButton.PRIMARY)) {
      draggable.setDragged(true)
      draggable.origin.set(
        this._mouse.x(), this._mouse.y(), 0, 1
      )
      draggable.cameraOrigin.set(
        camera2D.left, camera2D.bottom, 0, 1
      )
    }
  }
}
