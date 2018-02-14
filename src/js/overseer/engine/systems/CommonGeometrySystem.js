import { System, Component, Entity } from '@overseer/engine/ecs'
import { Geometry, OverseerGeometry } from '@overseer/engine/components'
import { CommonGeometries } from '@overseer/engine/services'
import { GLContext } from '@glkit'

/**
* A system that manage common geometries.
*/
@System.provide([ CommonGeometries ])
export class CommonGeometrySystem extends System {
  /**
  * Create a new CommonGeometrySystem.
  */
  constructor () {
    super()
    this._geometries = new Map()
    this._entities = new Set()
    this._geometryByEntity = new Map()
  }

  /**
  * @return {this.Service} The holded service instance.
  */
  getService () {
    return this
  }

  /**
  * @see CommonGeometries#get quad
  */
  get quad () {
    if (!this._geometries.has('quad')) {
      const entity = new Entity(this.manager)
      const geometry = entity.create(OverseerGeometry.Quad)
      this._geometries.set('quad', geometry)
      this._entities.add(entity)
      this._geometryByEntity.set(entity, 'quad')
    }

    return this._geometries.get('quad')
  }


  /**
  * @see System#managerDidAddComponent
  */
  managerWillDeleteEntity (entity) {
    if (this._entities.has(entity)) {
      this._geometries.delete(this._geometryByEntity(entity))
      this._geometryByEntity.delete(entity)
      this._entities.delete(entity)
    }
  }

  /**
  * @see System#managerWillDeleteComponent
  */
  managerWillDeleteComponent (component) {
    if (
      Component.isOfType(component, Geometry) &&
      this._entities.has(component.entity)
    ) {
      this._geometries.delete(this._geometryByEntity(component.entity))
      this._geometryByEntity.delete(component.entity)
      this._entities.delete(component.entity)
    }
  }


  /**
  * @see System#destroy
  */
  destroy () {
    for (const entity of this._entities) {
      this.manager.deleteEntity(entity)
    }

    this._entities.clear()
    this._geometryByEntity.clear()
    this._geometries.clear()
  }
}
