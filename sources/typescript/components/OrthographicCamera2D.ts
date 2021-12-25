import { Matrix4f, Vector2f } from '@cedric-demongivert/gl-tool-math'

/**
 * 
 */
export class OrthographicCamera2D {
  /**
   * 
   */
  public left: number

  /**
   * 
   */
  public bottom: number

  /**
   * 
   */
  public width: number

  /**
   * 
   */
  public height: number

  /**
   * 
   */
  public get right(): number {
    return this.left + this.width
  }

  /**
   * 
   */
  public set right(right: number) {
    this.left = right - this.width
  }

  /**
   * 
   */
  public get top(): number {
    return this.bottom + this.height
  }

  /**
   * 
   */
  public set top(top: number) {
    this.bottom = top - this.height
  }

  /**
  * @return The aspect ratio of the camera as a number.
  */
  public get aspectRatio() {
    return this.width / this.height
  }

  /**
  * @return The squared radius of this camera.
  */
  public get squaredRadius(): number {
    const width: number = this.width
    const height: number = this.height

    return width * width + height * height
  }

  /**
  * @return The radius of this camera.
  */
  public get radius(): number {
    return Math.sqrt(this.squaredRadius)
  }

  /**
  * Return the y component of the center of this camera.
  *
  * @return The y component of the center of this camera.
  */
  public get centerY(): number {
    return this.bottom + this.height / 2
  }

  /**
  * Change the y component of the center of this camera.
  *
  * @param value - The new y component of the center of this camera.
  */
  public set centerY(value: number) {
    this.setCenterY(value)
  }

  /**
  * Return the x component of the center of this camera.
  *
  * @return The x component of the center of this camera.
  */
  public get centerX(): number {
    return this.left + this.width / 2
  }

  /**
  * Change the x component of the center of this camera.
  *
  * @param value - The new x component of the center of this camera.
  */
  public set centerX(value: number) {
    this.setCenterX(value)
  }

  /**
  * Return the current center of the camera.
  *
  * @return The current center of the camera.
  */
  public get center(): Vector2f {
    return this.extractCenter()
  }

  /**
  * Change the center of this camera.
  *
  * @param value - The new center of the camera.
  */
  public set center(value: Vector2f) {
    this.setCenter(value.x, value.y)
  }

  /**
  * @see Component#initialize
  */
  public constructor() {
    this.left = 0
    this.bottom = 0
    this.width = 1
    this.height = 1
  }

  /**
  * Return the current world to view matrix of this camera.
  *
  * @param [result = new Matrix4f()] - The matrix to set to the world to view matrix of this camera.
  */
  public extractWorldToView(target = new Matrix4f()): void {
    const left: number = this.left
    const bottom: number = this.bottom
    const width: number = this.width
    const height: number = this.height

    const sx: number = 2 / width
    const px: number = -((left * 2 + width) / width)
    const sy: number = 2 / height
    const py: number = -((bottom * 2 + height) / height)

    target.set(
      sx, 0, 0, px,
      0, sy, 0, py,
      0, 0, 1, 0,
      0, 0, 0, 1
    )
  }

  /**
  * Return the current world to view matrix of this camera.
  *
  * @param [result = new Matrix4f()] - The matrix to set to the world to view matrix of this camera.
  */
  public extractViewToWorld(target = new Matrix4f()): void {
    this.extractWorldToView(target)
    target.invert()
  }

  /**
   * 
   */
  public lookAt(x: number, y: number): void {
    this.setCenter(x, y)
  }

  /**
  * Change the x component of the center of this camera.
  *
  * @param value - The new x component of the center of this camera.
  */
  public setCenterX(value: number): void {
    this.left = value - this.width / 2
  }

  /**
  * Change the y component of the center of this camera.
  *
  * @param value - The new y component of the center of this camera.
  */
  public setCenterY(value: number) {
    this.bottom = value - this.height / 2
  }

  /**
  * Return the current center of the camera.
  *
  * @param [result = new Vector2f()] - The vector to set to the center of this camera.
  *
  * @return The current center of the camera.
  */
  public extractCenter(result = new Vector2f()): Vector2f {
    result.set(this.centerX, this.centerY)
    return result
  }

  /**
  * Set the new center of this camera.
  *
  * @param x - The new x componen value of the center of this camera.
  * @param y - The new x componen value of the center of this camera.
  */
  public setCenter(x: number, y: number): void {
    this.left = x - this.width / 2
    this.bottom = y - this.height / 2
  }

  /**
  * Reset this component instance to its initial state.
  */
  public clear(): void {
    this.left = 0
    this.bottom = 0
    this.width = 1
    this.height = 1
  }

  /**
  * Copy another instance of this component.
  *
  * @param other - Other instance to copy.
  */
  public copy(other: OrthographicCamera2D): void {
    this.left = other.left
    this.bottom = other.bottom
    this.width = other.width
    this.height = other.height
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof OrthographicCamera2D) {
      return (
        other.left === this.left &&
        other.bottom === this.bottom &&
        other.width === this.width &&
        other.height === this.height
      )
    }

    return false
  }
}
