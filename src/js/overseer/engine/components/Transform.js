import { Component } from '@overseer/engine/ecs'
import { Length } from '@overseer/engine/Length'
import { Matrix3f } from '@glkit'

/**
* Assign a transformation matrix to the current entity.
*/
@Component.Type('overseer:engine:transform')
export class Transform {
  /**
  * Create a new unitary transform for an entity.
  */
  constructor () {
    this.state = {
      parent: null,
      transformation: Matrix3f.identity,
      unit: new Length('1m')
    }

    this._computeLocaleToWorld = this._computeLocaleToWorld.bind(this)
  }

  /**
  * @return {Matrix3f} The world to locale transformation matrix.
  */
  get worldToLocale () {
    return this.localeToWorld.invert()
  }

  /**
  * @return {Matrix3f} The locale to world transformation matrix.
  */
  get localeToWorld () {
    return this._computeLocaleToWorld()
  }

  /**
  * @return {Matrix3f} The locale to world transformation matrix.
  */
  _computeLocaleToWorld () {
    let result = this._transformation

    if (this._parent) {
      result = result.mul(MapObject.unitScale(this, this._parent))
                     .mul(this._parent.localeToWorld)
    }

    delete this.localeToWorld
    this.localeToWorld = result

    return result
  }

  /**
  * Enqueue a computation of the locale to world matrix.
  */
  _updateLocaleToWorld () {
    if (!Object.getOwnPropertyDescriptor(this, 'localeToWorld').get) {
      Object.assign(
        this, 'localeToWorld', { get: this._computeLocaleToWorld }
      )
    }
  }

  /**
  * Return the transformation matrix of this object.
  *
  * @return {Matrix3f} The transformation matrix.
  */
  get transformation () {
    return this.state.transformation
  }

  /**
  * Change the transformation matrix of this object.
  *
  * @param {Matrix3f} newTransformation - The new transformation matrix to set.
  */
  set transformation (newTransformation) {
    this.state.transformation = newTransformation
    this._updateLocaleToWorld()
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
  * @param {Vector2f} newSize - The new size of this object.
  */
  set size (newSize) {
    const oldSize = this.state.transformation.extract2DScale()

    this.state.transformation = this.state.transformation.mul(
      Matrix3f.scale2D(newSize.x / oldSize.x, newSize.y / oldSize.y)
    )
    this._updateLocaleToWorld()
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
  * @param {Vector2f} newPosition - The new position of this object.
  */
  set position (newPosition) {
    const oldPosition = this.state.transformation.extract2DTranslation()

    this.state.transformation = this.state.transformation.mul(
      Matrix3f.translation2D(newPosition.sub(oldPosition))
    )
    this._updateLocaleToWorld()
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
      Matrix3f.rotation2D(newRotation - oldRotation)
    )
    this._updateLocaleToWorld()
  }

  /**
  * Return the parent transformation.
  *
  * @return {Component} The parent transformation if exists.
  */
  get parent () {
    if (this.state.parent != null) {
      return this.manager.getComponent(this.state.parent)
    } else {
      return null
    }
  }

  /**
  * Change the parent transformation.
  *
  * @param {Component} newParent - The new parent transformation.
  */
  set parent (newParent) {
    const identifier = Component.identifier(newParent)
    if (identifier !== this.state.parent) {
      this.state.parent = identifier
      this._updateLocaleToWorld()
    }
  }

  /**
  * Return the unit length for this object.
  *
  * @return {Length} The unit used length for this object.
  */
  get unit () {
    return this.state.unit.copy()
  }

  /**
  * Change the unit length for this object.
  *
  * @param {Length} newUnit - The new unit length for this object.
  */
  set unit (newUnit) {
    this.state.unit = new Length(newUnit)
    this._updateLocaleToWorld()
  }

  /**
  * Translate this object.
  *
  * @param {...any} params - The translation vector to use.
  *
  * @return {MapObject} This object for chaining purpose.
  */
  translate (...params) {
    this.state.transformation = this.state.transformation.mul(
      Matrix3f.translate2D(...params)
    )
    this._updateLocaleToWorld()

    return this
  }

  /**
  * Rotate this object.
  *
  * @param {number} theta - The rotation angle to use in radians.
  *
  * @return {MapObject} This object for chaining purpose.
  */
  rotate (theta) {
    this.state.transformation = this.state.transformation.mul(
      Matrix3f.rotate2D(theta)
    )
    this._updateLocaleToWorld()

    return this
  }

  /**
  * Scale this object.
  *
  * @param {...any} params - The scale vector to use.
  *
  * @return {MapObject} This object for chaining purpose.
  */
  scale (...params) {
    this.state.transformation = this.state.transformation.mul(
      Matrix3f.scale2D(...params)
    )
    this._updateLocaleToWorld()

    return this
  }
}
