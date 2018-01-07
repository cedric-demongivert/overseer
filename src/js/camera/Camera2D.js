import { Length } from '../Length'

export class Camera2D {
  /**
  * Construct a new 2D overseer camera.
  *
  * @param {Length} [pixelUnit = new Length('3m').divide(50)] - Initial length by pixel of the camera.
  */
  constructor (pixelUnit = new Length('3m').divide(50)) {
    this._pixelUnit = pixelUnit.copy()
    this._computeWorldToCamera = this._computeWorldToCamera.bind(this)
    this._computeCameraToWorld = this._computeCameraToWorld.bind(this)
  }

  /**
  * @return {Matrix3f} The world to camera matrix.
  */
  get worldToCamera () {
    return this._computeWorldToCamera()
  }

  /**
  * Compute a new world to camera matrix by using current instance fields.
  *
  * @return {Matrix3f} The new world to camera matrix.
  */
  computeWorldToCamera () {
    throw new Error(
      'Camera2D#computeWorldToCamera() : Matrix3f is not implemented.'
    )
  }

  /**
  * Call computeWorldToCamera and memoize the result.
  *
  * @return {Matrix3f} The result of computeWorldToCamera.
  */
  _computeWorldToCamera () {
    const result = this.computeWorldToCamera()
    Object.defineProperty(
      this, 'worldToCamera', {
        value: result,
        configurable: true
      }
    )

    return result
  }

  /**
  * Compute a new camera to world matrix by using current instance fields.
  *
  * @return {Matrix3f} The new camera to world matrix.
  */
  computeCameraToWorld () {
    return this.worldToCamera.invert()
  }

  /**
  * Call computeCameraToWorld and memoize the result.
  *
  * @return {Matrix3f} The result of computeCameraToWorld
  */
  _computeCameraToWorld () {
    const result = this.computeCameraToWorld()
    Object.defineProperty(this, 'cameraToWorld', {
      value: result,
      configurable: true
    })

    return result
  }

  /**
  * Enqueue a computation of the world to camera matrix.
  *
  * @return {Camera2D} The current instance for chaining purpose.
  */
  updateWorldToCamera () {
    const descriptor = Object.getOwnPropertyDescriptor(this, 'worldToCamera')
    if (descriptor == null || !descriptor.get) {
      Object.defineProperty(
        this, 'worldToCamera', {
          get: this._computeWorldToCamera,
          configurable: true
        }
      )
      Object.defineProperty(
        this, 'cameraToWorld', {
          get: this._computeCameraToWorld,
          configurable: true
        }
      )
    }

    return this
  }

  /**
  * Return the camera to world matrix.
  *
  * @return {Matrix3f} The camera to world matrix.
  */
  get cameraToWorld () {
    return this._computeCameraToWorld()
  }

  /**
  * Return the current unit by pixel of the camera.
  *
  * @return {Length} The current unit by pixel of the camera.
  */
  get pixelUnit () {
    return this._pixelUnit
  }

  /**
  * Change the current unit by pixel of the camera.
  *
  * @param {Length} newUnit - The new unit by pixel of the camera.
  */
  set pixelUnit (newUnit) {
    this._pixelUnit = newUnit.copy()
    this.updateWorldToCamera()
  }
}
