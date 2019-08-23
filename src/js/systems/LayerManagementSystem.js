import { Layer } from '@overseer/components/Layer'

import { OverseerSystem } from './OverseerSystem'

import { HierarchyManagementSystem } from './HierarchyManagementSystem'

const UINT16_MAX_CAPACITY = 0xffff + 1
const UINT8_MAX_CAPACITY = 0xff + 1

export class LayerManagementSystem extends OverseerSystem {
  /**
  * Create a new layering management system.
  */
  constructor () {
    super()
    this._entities = null
    this._priorities = null
    this._hierarchy = 0
    this.comparePriority = this.comparePriority.bind(this)
  }

  /**
  * @see gltool-ecs/System#initialize
  */
  initialize () {
    this._entities = this.allocateEntityBuffer(this.manager.capacity.entities)
    this._priorities = this.allocateEntityBuffer(this.manager.capacity.entities)
    this._hierarchy = this.manager.requireSystem(HierarchyManagementSystem)
  }

  /**
  * @see gltool-ecs/System#destroy
  */
  destroy () {
    this._entities = null
    this._priorities = null
    this._hierarchy = null
  }

  /**
  * Return the rendering priority of the given entity.
  *
  * @param {number} entity - An entity to check.
  *
  * @return {number} The rendering priority of the given entity.
  */
  getPriorityOf (entity) {
    return this._priorities[entity]
  }

  /**
  * Return the nth entity to render.
  *
  * @param {number} index - Index of the entity to render.
  *
  * @return {number} The nth entity to render.
  */
  getEntity (index) {
    return this._entities[index]
  }

  /**
  * Refresh the entire rendering queue.
  */
  commitAll () {
    const entities = this.manager.entities

    for (let index = 0, size = entities.size; index < size; ++index) {
      this._entities[index] = entities.get(index)
    }

    this._entities.subarray(0, entities.size).sort(this.comparePriority)

    for (let index = 0, size = entities.size; index < size; ++index) {
      this._priorities[this._entities[index]] = index
    }
  }

  commit (entity) {
    this.commitAll()
  }

  /**
  * Compare the rendering priority of two entities.
  *
  * @param {number} left - The entity to use as a left operand.
  * @param {number} right - The entity to use as a right operand.
  *
  * @return {number} 1 if left is greather than right, -1 if left is less than right or 0 if left is equal to right.
  */
  comparePriority (left, right) {
    let result = this.compareLayer(left, right)

    if (result === 0) {
      result = this.compareDepth(left, right)
      if (result === 0) {
        result = this.compareIdentifier(left, right)
      }
    }

    return result
  }

  /**
  * Compare the identifiers of two entities.
  *
  * @param {number} left - The entity to use as a left operand.
  * @param {number} right - The entity to use as a right operand.
  *
  * @return {number} 1 if left is greather than right, -1 if left is less than right or 0 if left is equal to right.
  */
  compareIdentifier (left, right) {
    return left < right ? -1 : (left > right ? 1 : 0)
  }

  /**
  * Compare the depth of two entities.
  *
  * @param {number} left - The entity to use as a left operand.
  * @param {number} right - The entity to use as a right operand.
  *
  * @return {number} 1 if left is greather than right, -1 if left is less than right or 0 if left is equal to right.
  */
  compareDepth (left, right) {
    const leftDepth = this._hierarchy.getDepthOf(left)
    const rightDepth = this._hierarchy.getDepthOf(right)

    return leftDepth < rightDepth ? -1 : (leftDepth > rightDepth ? 1 : 0)
  }

  /**
  * Compare the storing layers of two entities.
  *
  * @param {number} left - The entity to use as a left operand.
  * @param {number} right - The entity to use as a right operand.
  *
  * @return {number} 1 if left is greather than right, -1 if left is less than right or 0 if left is equal to right.
  */
  compareLayer (left, right) {
    const leftLayer = this.getLayerOf(left)
    const rightLayer = this.getLayerOf(right)

    if (leftLayer == rightLayer) {
      return 0
    } else if (leftLayer == null) {
      return -1
    } else if (rightLayer == null) {
      return 1
    } else {
      return leftLayer < rightLayer ? -1 : (leftLayer > rightLayer ? 1 : 0)
    }
  }

  /**
  * Return the layer that contains the given entity if exists.
  *
  * @param {number} entity - Entity to check.
  *
  * @return {number} The layer that contains the given entity if exists, null otherwise.
  */
  getLayerOf (entity) {
    let current = entity

    while (current != null) {
      if (this.manager.hasComponent(current, Layer)) {
        return this.manager.getInstance(current, Layer).value
      }

      current = this._hierarchy.getParentOf(current)
    }

    return null
  }

  /**
  * Does allocate a buffer for storing a number of entities up to the given capacity.
  *
  * @param {number} capacity - The maximum number of entities to store into the layer buffer.
  *
  * @return {TypedArray} A typed array for storing the given number of entities.
  */
  allocateEntityBuffer (capacity) {
    if (capacity <= UINT8_MAX_CAPACITY) {
      return new Uint8Array(capacity)
    } else if (capacity <= UINT16_MAX_CAPACITY) {
      return new Uint16Array(capacity)
    } else {
      return new Uint32Array(capacity)
    }
  }
}
