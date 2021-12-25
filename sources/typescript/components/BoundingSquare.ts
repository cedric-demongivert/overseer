import { Vector2f } from '@cedric-demongivert/gl-tool-math'

import { BoundingCircle } from './BoundingCircle'

/**
 * 
 */
export class BoundingSquare {
  /**
   * 
   */
  public top: number

  /**
   * 
   */
  public bottom: number

  /**
   * 
   */
  public left: number

  /**
   * 
   */
  public right: number

  /**
  * Create a new unitary bounding square.
  */
  public constructor() {
    this.top = 0.5
    this.bottom = -0.5
    this.left = -0.5
    this.right = 0.5
  }

  /**
  * Set this bounding square as the bounding square of the given bounding circle.
  *
  * @param boundingCircle - A bounding circle to wrap into a square.
  */
  public ofCircle(boundingCircle: BoundingCircle) {
    const radius = boundingCircle.radius
    const center = boundingCircle.center

    this.left = center.x - radius
    this.right = center.x + radius
    this.bottom = center.y - radius
    this.top = center.y + radius
  }

  /**
  * Return the x component of the center of this bounding square.
  *
  * @return The x component of the center of this bounding square.
  */
  public get centerX(): number {
    return (this.left + this.right) / 2
  }

  /**
  * Change the x component of the center of this bounding square.
  *
  * @param value - The new x component of the center of this bounding square.
  */
  public set centerX(value: number) {
    this.setCenterX(value)
  }

  /**
  * Change the x component of the center of this bounding square.
  *
  * @param value - The new x component of the center of this bounding square.
  */
  public setCenterX(value: number): void {
    const hwidth: number = this.width / 2

    this.left = value - hwidth
    this.right = value + hwidth
  }

  /**
  * Return the y component of the center of this bounding square.
  *
  * @return The y component of the center of this bounding square.
  */
  public get centerY(): number {
    return (this.bottom + this.top) / 2
  }

  /**
  * Change the y component of the center of this bounding square.
  *
  * @param value - The new y component of the center of this bounding square.
  */
  public set centerY(value: number) {
    this.setCenterY(value)
  }

  /**
  * Change the y component of the center of this bounding square.
  *
  * @param value - The new y component of the center of this bounding square.
  */
  public setCenterY(value: number) {
    const hheight = this.height / 2

    this.bottom = value - hheight
    this.top = value + hheight
  }

  /**
  * Return the current center of the bounding square.
  *
  * @param [result = new Vector2f()] - The vector to set to the center of this bounding square.
  *
  * @return The current center of the bounding square.
  */
  public extractCenter(result: Vector2f = new Vector2f()): Vector2f {
    result.set(this.centerX, this.centerY)
    return result
  }

  /**
  * Change the center of this bounding square.
  *
  * @param value - The new center of the bounding square.
  */
  public set center(value: Vector2f) {
    this.setCenter(value.x, value.y)
  }

  /**
  * Set the new center of this bounding square.
  *
  * @param x - The new x componen value of the center of this bounding square.
  * @param y - The new x componen value of the center of this bounding square.
  */
  public setCenter(x: number, y: number): void {
    const hwidth: number = this.width / 2
    const hheight: number = this.height / 2

    this.bottom = y - hheight
    this.top = y + hheight

    this.left = x - hwidth
    this.right = x + hwidth
  }

  /**
  * Return the width of the bounding square.
  *
  * @return The width of the bounding square.
  */
  public get width(): number {
    return this.right - this.left
  }

  /**
  * Change the width of the bounding square.
  *
  * @param value - The new width of the bounding square.
  */
  public set width(value: number) {
    this.setWidth(value)
  }

  /**
  * Change the width of the bounding square.
  *
  * @param value - The new width of the bounding square.
  */
  public setWidth(value: number): void {
    const centerX: number = this.centerX
    const hwidth: number = value / 2

    this.left = centerX - hwidth
    this.right = centerX + hwidth
  }

  /**
  * Return the height of the bounding square.
  *
  * @return The height of the bounding square.
  */
  public get height(): number {
    return this.top - this.bottom
  }

  /**
  * Change the height of the bounding square.
  *
  * @param value - The new height of the bounding square.
  */
  public set height(value: number) {
    this.setHeight(value)
  }

  /**
  * Change the height of the bounding square.
  *
  * @param value - The new height of the bounding square.
  */
  public setHeight(value: number): void {
    const centerY: number = this.centerY
    const hheight: number = value / 2

    this.bottom = centerY - hheight
    this.top = centerY + hheight
  }

  /**
  * @return True if this bounding square contains the given location.
  */
  public contains(x: number, y: number): boolean {
    return x >= this.left && x < this.right && y >= this.bottom && y < this.top
  }

  /**
  * Reset this bounding square to its initial state.
  */
  public clear(): void {
    this.top = 0.5
    this.bottom = -0.5
    this.left = -0.5
    this.right = 0.5
  }

  /**
  * Copy another instance of this component.
  *
  * @param other - Other instance to copy.
  */
  public copy(other: BoundingSquare): void {
    this.left = other.left
    this.right = other.right
    this.bottom = other.bottom
    this.top = other.top
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof BoundingSquare) {
      return (
        other.left === this.left &&
        other.right === this.right &&
        other.top === this.top &&
        other.bottom === this.bottom
      )
    }

    return false
  }
}
