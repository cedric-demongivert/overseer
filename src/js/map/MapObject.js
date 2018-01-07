import { Length } from '../Length'
import { GLObject, Matrix3f } from '../engine'

/**
* An Overseer map object.
*/
export class MapObject extends GLObject {
  /**
  * Compute the unit scale matrix between two objects.
  *
  * @param {MapObject} base - The object to scale.
  * @param {MapObject} target - The target object.
  *
  * @return {Matrix3f} The scale matrix between the two objects.
  */
  static unitScale (base, target) {
    const targetUnit = target.unit
    const baseUnit = base.unit
    const coef = targetUnit.value / baseUnit.in(targetUnit.unit).value
    return Matrix3f.scale2D(coef, coef)
  }

  /**
  * Create a new empty map.
  *
  * @param {GLContextualised} context - The parent opengl context of this object.
  */
  constructor (context) {
    super(context)
    this._unit = new Length('1m')
    this._parent = null
    this._transformation = Matrix3f.identity
    this._computeLocaleToWorld = this._computeLocaleToWorld.bind(this)
  }

  /**
  * Render this map object.
  *
  * @param {Camera} camera - The camera to use in order to render this map object.
  */
  render (camera) {

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
    return this._transformation
  }

  /**
  * Change the transformation matrix of this object.
  *
  * @param {Matrix3f} newTransformation - The new transformation matrix to set.
  */
  set transformation (newTransformation) {
    this._transformation = newTransformation
    this._updateLocaleToWorld()
  }

  /**
  * Return the size of this object.
  *
  * @return {Vector2f} The size of this object.
  */
  get size () {
    return this._transformation.extract2DScale()
  }

  /**
  * Set the size of this object.
  *
  * @param {Vector2f} newSize - The new size of this object.
  */
  set size (newSize) {
    const oldSize = this._transformation.extract2DScale()

    this._transformation = this._transformation.mul(
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
    return this._transformation.extract2DTranslation()
  }

  /**
  * Set the position of this object.
  *
  * @param {Vector2f} newPosition - The new position of this object.
  */
  set position (newPosition) {
    const oldPosition = this._transformation.extract2DTranslation()

    this._transformation = this._transformation.mul(
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
    return this._transformation.extract2DRotation()
  }

  /**
  * Set the rotation of this object.
  *
  * @param {number} newRotation - The new rotation of this object.
  */
  set rotation (newRotation) {
    const oldRotation = this._transformation.extract2DRotation()

    this._transformation = this._transformation.mul(
      Matrix3f.rotation2D(newRotation - oldRotation)
    )
    this._updateLocaleToWorld()
  }

  /**
  * Return the parent group.
  *
  * @return {MapGroup} The parent group.
  */
  get parent () {
    return this._parent
  }

  /**
  * Change the parent group.
  *
  * @param {MapGroup} newParent - The new parent group.
  */
  set parent (newParent) {
    if (newParent !== this._parent) {
      if (this._parent) {
        const oldParent = this._parent
        this._parent = null
        oldParent.delete(this)
      }

      this._parent = newParent

      if (this._parent) {
        this._parent.add(this)
      }

      this._updateLocaleToWorld()
    }
  }

  /**
  * Return the unit length for this object.
  *
  * @return {Length} The unit used length for this object.
  */
  get unit () {
    return this._unit.copy()
  }

  /**
  * Change the unit length for this object.
  *
  * @param {Length} newUnit - The new unit length for this object.
  */
  set unit (newUnit) {
    this._unit = new Length(newUnit)
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
    this._transformation = this._transformation.mul(
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
    this._transformation = this._transformation.mul(
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
    this._transformation = this._transformation.mul(
      Matrix3f.scale2D(...params)
    )
    this._updateLocaleToWorld()

    return this
  }
}
