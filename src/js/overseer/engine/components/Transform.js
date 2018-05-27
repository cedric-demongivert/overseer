import { Component, Relation } from '@overseer/engine/ecs'
import { Length } from '@overseer/engine/Length'
import { Matrix3D, Vector2D, NumberType } from '@glkit'

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
  * @param {Matrix3D} result - Result matrix.
  *
  * @return {Matrix3D} The scale matrix between the two objects.
  */
  static unitScale (base, target, result) {
    const coef = base.in(target.unit) / target.value
    return Matrix3D.to2DScaleMatrix(result, coef, coef)
  }

  /**
  * @see Component#initialize
  */
  initialize () {
    this._localToWorld = Matrix3D.create(NumberType.FLOAT)
    this._worldToLocal = Matrix3D.create(NumberType.FLOAT)
    this._unitScale = Matrix3D.create(NumberType.FLOAT)
    this._temporary = Matrix3D.create(NumberType.FLOAT)
    this._dirtyMatrices = true

    this.state = {
      parent: null,
      transformation: Matrix3D.create(NumberType.FLOAT),
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
  * @return {Matrix3D} The world to local transformation matrix.
  */
  get worldToLocal () {
    if (this._dirtyMatrices) this._updateMatrices()
    return this._worldToLocal
  }

  /**
  * @return {Matrix3D} The local to world transformation matrix.
  */
  get localToWorld () {
    if (this._dirtyMatrices) this._updateMatrices()
    return this._localToWorld
  }

  _updateMatrices () {
    const transformation = this.state.transformation

    if (this._parent) {
      Transform.unitScale(this.unit, this.parent.unit, this._unitScale)

      Matrix3D.multiplyWith3DMatrix(
        transformation, this._unitScale, this._localToWorld
      )

      Matrix3D.multiplyWith3DMatrix(
        this.parent.localToWorld, this._localToWorld, this._localToWorld
      )

      Matrix3D.invert(this._localToWorld, this._worldToLocal)
    } else {
      Matrix3D.copy(transformation, this._localToWorld)
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
  * @return {Matrix3D} The transformation matrix.
  */
  get transformation () {
    return this.state.transformation
  }

  /**
  * Change the local transformation matrix.
  *
  * @param {Matrix3D} transformation - The new local transformation matrix to set.
  */
  set transformation (transformation) {
    this.state.transformation.setAll(...transformation)
    this._enqueueMatricesUpdate()
    this.touch()
  }

  /**
  * Return the size of this object.
  *
  * @return {Vector2D} The size of this object.
  */
  get size () {
    return Matrix3D.extract2DScale(this.state.transformation)
  }

  /**
  * Set the size of this object.
  *
  * @param {Iterable<number>} newSize - The new size of this object.
  */
  set size (newSize) {
    const transformation = this.state.transformation
    const oldSize = Matrix3D.extract2DScale(transformation)
    const [newWidth, newHeight] = newSize

    Matrix3D.apply2DScale(
      transformation,
      newWidth / oldSize.x, newHeight / oldSize.y
    )

    this._enqueueMatricesUpdate()
    this.touch()
  }

  /**
  * Return the position of this object.
  *
  * @return {Vector2D} The position of this object.
  */
  get position () {
    return Matrix3D.extract2DTranslation(this.state.transformation)
  }

  /**
  * Set the position of this object.
  *
  * @param {Vector2D} newPosition - The new position of this object.
  */
  set position (newPosition) {
    const transformation = this.state.transformation
    const oldPosition = Matrix3D.extract2DTranslation(transformation)

    Matrix3D.apply2DTranslation(
      transformation,
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
    return Matrix3D.extract2DRotation(this.state.transformation)
  }

  /**
  * Set the rotation of this object.
  *
  * @param {number} newRotation - The new rotation of this object.
  */
  set rotation (newRotation) {
    const transformation = this.state.transformation
    const oldRotation = Matrix3D.extract2DRotation(transformation)

    Matrix3D.apply2DRotation(transformation, newRotation - oldRotation)

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
  translate (...params) {
    Matrix3D.apply2DTranslation(
      this.state.transformation, ...params
    )

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
    Matrix3D.apply2DRotation(
      this.state.transformation, theta
    )

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
  scale (...params) {
    Matrix3D.apply2DScale(
      this.state.transformation, ...params
    )

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
