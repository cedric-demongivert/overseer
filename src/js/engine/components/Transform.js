import { Component, Relation } from '@overseer/engine/ecs'
import { Length } from '@overseer/engine/Length'
import { Matrix3f, Vector3f, Vector2f } from '@glkit'

/**
* Assign a transformation matrix to the current entity.
*/
@Component({ type: 'overseer:transform' })
export class Transform {
  /**
  * Apply a unit scale transformation to a given Matrix3f
  *
  * @param {Length} base - The object to scale.
  * @param {Length} target - The target object
  * @param {Matrix3f} transformation - Transformation matrix.
  * @param {Matrix3f} [result = transformation] - Result matrix.
  */
  static applyUnitScale (base, target, transformation, result = transformation) {
    const coef = base.in(target.unit) / target.value
    transformation.multiplyWithStaticMatrixAsRightOperand(
      coef, 0, 0,
      0, coef, 0,
      0, 0, 1,
      result
    )
  }

  /**
  * @see Component#initialize
  */
  initialize () {
    this._localToWorld = new Matrix3f()
    this._worldToLocal = new Matrix3f()
    this._temporary = new Matrix3f()
    this._dirtyMatrices = true

    this.state = {
      parent: null,
      transformation: new Matrix3f(),
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
    if (this._dirtyMatrices) this._updateMatrices()
    return this._worldToLocal
  }

  /**
  * @return {Matrix3f} The local to world transformation matrix.
  */
  get localToWorld () {
    if (this._dirtyMatrices) this._updateMatrices()
    return this._localToWorld
  }

  _updateMatrices () {
    const transformation = this.state.transformation

    this._localToWorld.copy(transformation)

    if (this._parent) {
      Transform.unitScale(this.unit, this.parent.unit, this._localToWorld)
      this.parent.localToWorld.multiplyWithMatrix(this._localToWorld, this._localToWorld)
      this._localToWorld.invert(this._worldToLocal)
    }

    this._dirtyMatrices = false
  }

  /**
  * Enqueue a computation of the local to world matrix.
  */
  _enqueueMatricesUpdate () {
    if (this._dirtyMatrices === false) {
      this._dirtyMatrices = true

      for (const child of this.children()) {
        child._enqueueMatricesUpdate()
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
    this.state.transformation.copy(transformation)
    this._enqueueMatricesUpdate()
    this.touch()
  }

  /**
  * Return the size of this object.
  *
  * @return {Vector3f} The size of this object.
  */
  get size () {
    const result = new Vector3f()
    this.state.transformation.extractScale(result)
    return result
  }

  /**
  * Set the size of this object.
  *
  * @param {Vector3f} newSize - The new size of this object.
  */
  set size (newSize) {
    const transformation = this.state.transformation
    const oldSize = new Vector3f()

    transformation.extract2DScale(oldSize)
    transformation.scale(newSize.x / oldSize.x, newSize.y / oldSize.y, 1.0)

    this._enqueueMatricesUpdate()
    this.touch()
  }

  /**
  * Return the position of this object.
  *
  * @return {Vector2f} The position of this object.
  */
  get position () {
    const result = new Vector2f()
    this.state.transformation.extract2DTranslation(result)
    return result
  }

  /**
  * Set the position of this object.
  *
  * @param {Vector2f} newPosition - The new position of this object.
  */
  set position (newPosition) {
    const transformation = this.state.transformation
    const oldPosition = new Vector2f()
    transformation.extractTranslation(oldPosition)

    transformation.translate(
      newPosition.x - oldPosition.x,
      newPosition.y - oldPosition.y
    )

    this._enqueueMatricesUpdate()
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
    const transformation = this.state.transformation
    const oldRotation = transformation.extract2DRotation()

    transformation.rotate(
      newRotation - oldRotation, 0, 0, transformation
    )

    this._enqueueMatricesUpdate()
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
      this._enqueueMatricesUpdate()
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
    this._enqueueMatricesUpdate()
    this.touch()
  }

  /**
  * Translate this object.
  *
  * @param {...any} params - The translation vector to use.
  *
  * @return {Transform} This component instance for chaining purpose.
  */
  translate (x, y) {
    this.state.transformation.translate(x, y)

    this._enqueueMatricesUpdate()
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
    this.state.transformation.rotate(theta, 0, 0)

    this._enqueueMatricesUpdate()
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
  scale (x, y) {
    this.state.transformation.scale(x, y, 1)

    this._enqueueMatricesUpdate()
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
