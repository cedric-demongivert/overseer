import { Component, Relation } from '@overseer/ecs'
import { Length } from '@overseer/overseer/Length'
import { Matrix3f, Vector3f, Vector2f } from '@cedric-demongivert/gl-tool-math'

/**
* Assign a transformation matrix to the current entity.
*/
@Component({ name: 'overseer:transform' })
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
  * Create a new zero transform.
  */
  constructor () {
    this._localToWorld = new Matrix3f()
    this._worldToLocal = new Matrix3f()
    this._synchronized = false
    this._parent = null
    this._children = new Set()
    this._unit = new Length('1m')
    this._transformation = new Matrix3f().toIdentity()
  }

  /**
  * Return the root transformation.
  *
  * @return {Transform} The root transformation.
  */
  get root () {
    let root = this
    while (root.parent) { root = root.parent }
    return root
  }

  /**
  * @return {Matrix3f} The world to local transformation matrix.
  */
  get worldToLocal () {
    if (!this._synchronized) this.synchronize()
    return this._worldToLocal
  }

  /**
  * Return the world to local transformation matrix.
  *
  * @param {Matrix3f} [result = new Matrix3f()] - The result matrix to use.
  *
  * @return {Matrix3f} The updated result matrix.
  */
  getWorldToLocal (result = new Matrix3f()) {
    result.copy(this.worldToLocal)
    return result
  }

  /**
  * @return {Matrix3f} The local to world transformation matrix.
  */
  get localToWorld () {
    if (!this._synchronized) this.synchronize()
    return this._localToWorld
  }

  /**
  * Return the local to world transformation matrix.
  *
  * @param {Matrix3f} [result = new Matrix3f()] - The result matrix to use.
  *
  * @return {Matrix3f} The updated result matrix.
  */
  getLocalToWorld (result = new Matrix3f()) {
    result.copy(this.localToWorld)
    return result
  }

  /**
  * Recompute this transformation local to world and world to local matrices.
  */
  synchronize () {
    const transformation = this._transformation

    this._localToWorld.copy(transformation)

    if (this._parent) {
      Transform.applyUnitScale(this.unit, this.parent.unit, this._localToWorld)
      this.parent.localToWorld.multiplyWithMatrix(
        this._localToWorld,
        this._localToWorld
      )
    }

    this._localToWorld.invert(this._worldToLocal)

    this.synchronized = true
  }

  /**
  * Change the synchronization state of this transformation.
  *
  * @param {boolean} value - The new synchronization sate of this transformation.
  */
  set synchronized (value) {
    this.setSynchronized(value)
  }

  /**
  * Change the synchronization state of this transformation.
  *
  * @param {boolean} value - The new synchronization sate of this transformation.
  *
  * @return {Transform} This instance for chaining purposes.
  */
  setSynchronized (value) {
    if (this._synchronized != value) {
      if (value == false) {
        for (const child of this.children()) child.synchronized = false
      }

      this._synchronized = value
    }

    return this
  }

  /**
  * Return the synchronization state of this transformation.
  *
  * @return {boolean} value - The synchronization sate of this matrix.
  */
  get synchronized () {
    return this._synchronized
  }

  /**
  * Return the local transformation matrix.
  *
  * @return {Matrix3f} The transformation matrix.
  */
  get transformation () {
    return this._transformation
  }

  /**
  * Return the local transformation matrix.
  *
  * @param {Matrix3f} [result = new Matrix3f()] - The result matrix to use.
  *
  * @return {Matrix3f} The updated result matrix.
  */
  getTransformation (result = new Matrix3f()) {
    result.copy(this._transformation)
    return result
  }

  /**
  * Change the local transformation matrix.
  *
  * @param {Matrix3f} transformation - The new local transformation matrix to set.
  */
  set transformation (transformation) {
    this.setTransformation(transformation)
  }

  /**
  * Change the local transformation matrix.
  *
  * @param {Matrix3f} transformation - The new local transformation matrix to set.
  *
  * @return {Transform} This instance for chaining purposes.
  */
  setTransformation (transformation) {
    this._transformation.copy(transformation)
    this.synchronized = false
    return this
  }

  /**
  * Return the size of this object.
  *
  * @return {Vector2f} The size of this object.
  */
  get size () {
    return this.getSize()
  }

  /**
  * Return the size of this object.
  *
  * @param {Vector2f} [result = new Vector2f()] - The result vector to use.
  *
  * @return {Vector2f} The updated result vector.
  */
  getSize (result = new Vector2f()) {
    this._transformation.extract2DScale(result)
    return result
  }

  /**
  * Set the size of this object.
  *
  * @param {Vector2f} newSize - The new size of this object.
  */
  set size (newSize) {
    this.setSize(newSize.x, newSize.y)
  }

  /**
  * Change the size of this object.
  *
  * @param {number} width - The new width of this object.
  * @param {number} height - The new height of this object.
  *
  * @return {Transform} The current instance for chaining purposes.
  */
  setSize (width, height) {
    const transformation = this._transformation
    const oldSize = new Vector3f()

    transformation.extractScale(oldSize)
    transformation.scale(width / oldSize.x, height / oldSize.y, 1.0)

    this.synchronized = false

    return this
  }

  /**
  * Return the position of this object.
  *
  * @return {Vector2f} The position of this object.
  */
  get position () {
    return this.getPosition()
  }

  /**
  * Return the position of this object.
  *
  * @param {Vector2f} [result = new Vector2f()] - The result vector to use.
  *
  * @return {Vector2f} The updated result vector.
  */
  getPosition (result = new Vector2f()) {
    this._transformation.extractTranslation(result)
    return result
  }

  /**
  * Set the position of this object.
  *
  * @param {Vector2f} newPosition - The new position of this object.
  */
  set position (newPosition) {
    this.setPosition(newPosition.x, newPosition.y)
  }

  /**
  * Set the position of this object.
  *
  * @param {number} x - The x component of the new position of this object.
  * @param {number} y - The y component of the new position of this object.
  *
  * @return {Transform} The current instance for chaining purposes.
  */
  setPosition (x, y) {
    const transformation = this._transformation
    const oldPosition = new Vector2f()
    transformation.extractTranslation(oldPosition)

    transformation.translate(
      x - oldPosition.x,
      y - oldPosition.y
    )

    this.synchronized = false
    return this
  }

  /**
  * Return the rotation of this object.
  *
  * @return {number} The rotation of this object.
  */
  get rotation () {
    return this._transformation.extract2DRotation()
  }

  /**
  * Set the rotation of this object.
  *
  * @param {number} newRotation - The new rotation of this object.
  */
  set rotation (newRotation) {
    this.setRotation(newRotation)
  }

  /**
  * Set the rotation of this object.
  *
  * @param {number} newRotation - The new rotation of this object.
  *
  * @return {Transform} The current instance for chaining purposes.
  */
  setRotation (newRotation) {
    const transformation = this._transformation
    const oldRotation = transformation.extract2DRotation()

    transformation.rotate(
      0, 0, newRotation - oldRotation
    )

    this.synchronized = false
    return this
  }

  /**
  * Return the parent transformation.
  *
  * @return {Transform} The parent transformation if exists.
  */
  get parent () {
    return this._parent
  }

  /**
  * Change the parent transformation.
  *
  * @param {Transform} newParent - The new parent transformation.
  */
  set parent (newParent) {
    this.setParent(newParent)
  }

  /**
  * Change the parent transformation.
  *
  * @param {Transform} newParent - The new parent transformation.
  *
  * @return {Transform} The current instance for chaining purposes.
  */
  setParent (newParent) {
    if (newParent !== this._parent) {
      if (this._parent) {
        const oldParent = this._parent
        this._parent = null
        oldParent.deleteChild(this)
      }

      this._parent = newParent
      this.synchronized = false

      if (newParent != null) newParent.addChild(this)
    }

    return this
  }

  /**
  * Return the unit length of this object.
  *
  * @return {Length} The unit used length for this object.
  */
  get unit () {
    return this._unit.clone()
  }

  /**
  * Change the unit length of this object.
  *
  * @param {Length} unit - The new unit length of this object.
  */
  set unit (unit) {
    this.setUnit(unit)
  }

  /**
  * Change the unit length of this object.
  *
  * @param {Length} unit - The new unit length of this object.
  *
  * @return {Transform} The current instance for chaining purposes.
  */
  setUnit (unit) {
    this._unit = new Length(unit)
    this.synchronized = false
    return this
  }

  /**
  * Translate this object.
  *
  * @param {number} x - The x component value of the translation.
  * @param {number} y - The y component value of the translation.
  *
  * @return {Transform} This component instance for chaining purpose.
  */
  translate (x, y) {
    this._transformation.translate(x, y)
    this.synchronized = false

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
    this._transformation.rotate(0, 0, theta)
    this.synchronized = false

    return this
  }

  /**
  * Scale this object.
  *
  * @param {number} x - The x component value of the scale.
  * @param {number} y - The y component value of the scale.
  *
  * @return {Transform} This object for chaining purpose.
  */
  scale (x, y) {
    this._transformation.scale(x, y, 1)
    this.synchronized = false

    return this
  }

  /**
  * Add a child transform to this component.
  *
  * @param {Transform} child - The child to add.
  *
  * @return {Transform} This object for chaining purpose.
  */
  addChild (child) {
    if (!this._children.has(child)) {
      this._children.add(child)
      child.parent = this
    }

    return this
  }

  /**
  * Iterate over all children of this transform.
  *
  * @return {Iterator<Transform>} An iterator over all children of this transform.
  */
  * children () {
    yield * this._children
  }

  /**
  * Remove a child transform of this component.
  *
  * @param {Transform} child - The child to delete.
  *
  * @return {Transform} This object for chaining purpose.
  */
  deleteChild (child) {
    if (this._children.has(child)) {
      this._children.delete(child)
      child.parent = null
    }

    return this
  }

  /**
  * Remove all children transform of this component.
  *
  * @return {Transform} This object for chaining purpose.
  */
  clear () {
    for (const child of this._children) {
      this.deleteChild(child)
    }

    return this
  }
}
