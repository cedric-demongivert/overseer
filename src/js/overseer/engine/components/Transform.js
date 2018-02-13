import { Component, Relation } from '@overseer/engine/ecs'
import { Length } from '@overseer/engine/Length'
import { Matrix3f, Vector2f } from '@glkit'

/**
* Assign a transformation matrix to the current entity.
*/
@Component({ type: 'overseer:engine:transform' })
export class Transform {
  /**
  * Compute the unit scale matrix between two Transform component.
  *
  * @param {Length} base - The object to scale.
  * @param {Length} target - The target object.
  *
  * @return {Matrix3f} The scale matrix between the two objects.
  */
  static unitScale (base, target) {
    const coef = base.in(target.unit) / target.value
    return Matrix3f.scale2D(coef, coef)
  }

  /**
  * @see Component#initialize
  */
  initialize () {
    this._computeLocalToWorld = this._computeLocalToWorld.bind(this)
    this._computeWorldToLocal = this._computeWorldToLocal.bind(this)

    this.state = {
      parent: null,
      transformation: Matrix3f.identity,
      unit: new Length('1m'),
      children: new Set()
    }
  }

  /**
  * Return the unit of the root transform.
  *
  * @return {Length} The unit of the root transform.
  */
  get rootUnit () {
    let root = this
    while (root.parent) { root = root.parent }
    return root.unit
  }

  /**
  * @return {Matrix3f} The world to local transformation matrix.
  */
  get worldToLocal () {
    return this._computeWorldToLocal()
  }

  /**
  * @return {Matrix3f} The local to world transformation matrix.
  */
  get localToWorld () {
    return this._computeLocalToWorld()
  }

  /**
  * @return {Matrix3f} The local to world transformation matrix.
  */
  _computeLocalToWorld () {
    let result = this.state.transformation

    if (this._parent) {
      result = result.mul(Transform.unitScale(this.unit, this.parent.unit))
                     .mul(this.parent.localToWorld)
    }

    Object.defineProperty(
      this, 'localToWorld', { value: result, configurable: true }
    )

    return result
  }

  /**
  * @return {Matrix3f} The local to world transformation matrix.
  */
  _computeWorldToLocal () {
    const result = this.localToWorld.invert()

    Object.defineProperty(
      this, 'worldToLocal', { value: result, configurable: true }
    )

    return result
  }

  /**
  * Enqueue a computation of the local to world matrix.
  */
  _updateLocalToWorld () {
    const descriptor = Object.getOwnPropertyDescriptor(this, 'localToWorld')

    if (descriptor && !descriptor.get) {
      Object.defineProperty(
        this, 'localToWorld', {
          get: this._computeLocalToWorld,
          configurable: true
        }
      )

      Object.defineProperty(
        this, 'worldToLocal', {
          get: this._computeWorldToLocal,
          configurable: true
        }
      )

      for (const child of this.children()) {
        child._updateLocalToWorld()
      }
    }
  }

  /**
  * Return the local transformation matrix.
  *
  * @return {Matrix3f} The transformation matrix.
  */
  get transformation () {
    return this.state.transformation
  }

  /**
  * Change the local transformation matrix.
  *
  * @param {Matrix3f} transformation - The new local transformation matrix to set.
  */
  set transformation (transformation) {
    this.state.transformation = transformation
    this._updateLocalToWorld()
    this.touch()
  }

  /**
  * Return the size of this object.
  *
  * @return {Vector2f} The size of this object.
  */
  get size () {
    return this.state.transformation.extract2DScale()
  }

  /**
  * Set the size of this object.
  *
  * @param {Iterable<number>} newSize - The new size of this object.
  */
  set size (newSize) {
    const oldSize = this.state.transformation.extract2DScale()
    const [newWidth, newHeight] = newSize

    this.state.transformation = this.state.transformation.mul(
      Matrix3f.scale2D(newWidth / oldSize.x, newHeight / oldSize.y)
    )

    this._updateLocalToWorld()
    this.touch()
  }

  /**
  * Return the position of this object.
  *
  * @return {Vector2f} The position of this object.
  */
  get position () {
    return this.state.transformation.extract2DTranslation()
  }

  /**
  * Set the position of this object.
  *
  * @param {Iterable<number>} newPosition - The new position of this object.
  */
  set position (newPosition) {
    const oldPosition = this.state.transformation.extract2DTranslation()
    if (!(newPosition instanceof Vector2f)) {
      newPosition = new Vector2f(newPosition)
    }

    this.state.transformation = this.state.transformation.mul(
      Matrix3f.translate2D(newPosition.sub(oldPosition))
    )

    this._updateLocalToWorld()
    this.touch()
  }

  /**
  * Return the rotation of this object.
  *
  * @return {number} The rotation of this object.
  */
  get rotation () {
    return this.state.transformation.extract2DRotation()
  }

  /**
  * Set the rotation of this object.
  *
  * @param {number} newRotation - The new rotation of this object.
  */
  set rotation (newRotation) {
    const oldRotation = this.state.transformation.extract2DRotation()

    this.state.transformation = this.state.transformation.mul(
      Matrix3f.rotate2D(newRotation - oldRotation)
    )

    this._updateLocalToWorld()
    this.touch()
  }

  /**
  * Return the parent transformation.
  *
  * @return {Component} The parent transformation if exists.
  */
  @Relation.one(Transform)
  get parent () {
    return this.state.parent
  }

  /**
  * Change the parent transformation.
  *
  * @param {Component} newParent - The new parent transformation.
  */
  @Relation.one(Transform)
  set parent (newParent) {
    if (identifier !== this.state.parent) {
      if (this.state.parent) {
        const oldParent = this.state.parent
        this.state.parent = null
        this.manager.getComponent(oldParent).deleteChild(this)
      }

      this.state.parent = identifier
      this.parent.addChild(this)
      this._updateLocalToWorld()
      this.touch()
    }
  }

  /**
  * Return the unit length for this object.
  *
  * @return {Length} The unit used length for this object.
  */
  get unit () {
    return this.state.unit.clone()
  }

  /**
  * Change the unit length for this object.
  *
  * @param {Length} unit - The new unit length for this object.
  */
  set unit (unit) {
    this.state.unit = new Length(unit)
    this._updateLocalToWorld()
    this.touch()
  }

  /**
  * Translate this object.
  *
  * @param {...any} params - The translation vector to use.
  *
  * @return {Transform} This component instance for chaining purpose.
  */
  translate (...params) {
    this.state.transformation = this.state.transformation.mul(
      Matrix3f.translate2D(...params)
    )

    this._updateLocalToWorld()
    this.touch()

    return this
  }

  /**
  * Rotate this object.
  *
  * @param {number} theta - The rotation angle to use in radians.
  *
  * @return {Transform} This object for chaining purpose.
  */
  rotate (theta) {
    this.state.transformation = this.state.transformation.mul(
      Matrix3f.rotate2D(theta)
    )

    this._updateLocalToWorld()
    this.touch()

    return this
  }

  /**
  * Scale this object.
  *
  * @param {...any} params - The scale vector to use.
  *
  * @return {Transform} This object for chaining purpose.
  */
  scale (...params) {
    this.state.transformation = this.state.transformation.mul(
      Matrix3f.scale2D(...params)
    )

    this._updateLocalToWorld()
    this.touch()

    return this
  }

  /**
  * Add a child transform to this component.
  *
  * @param {Transform|Identifier} child - The new child to add.
  */
  addChild (child) {
    const identifier = Component.identifier(child)
    if (!this.state.children.has(identifier)) {
      this.state.children.add(identifier)
      this.manager.getComponent(identifier).parent = this
      this.touch()
    }
  }

  * children () {
    yield * this.state.children
  }

  /**
  * Remove a child transform of this component.
  *
  * @param {Transform|Identifier} child - The child to delete.
  */
  deleteChild (child) {
    const identifier = Component.identifier(child)
    if (this.state.children.has(identifier)) {
      this.state.children.delete(identifier)
      this.manager.getComponent(identifier).parent = null
      this.touch()
    }
  }
}
