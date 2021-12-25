import { Vector2f } from '@cedric-demongivert/gl-tool-math'

import { BoundingSquare } from './BoundingSquare'

/**
 * 
 */
export class BoundingCircle {
  /**
   * 
   */
  public readonly center: Vector2f

  /**
   * 
   */
  private _radius: number

  /**
   * 
   */
  private _squaredRadius: number

  /**
  * Create a new unitary bounding circle.
  */
  public constructor() {
    this.center = new Vector2f()
    this._radius = 1
    this._squaredRadius = 1
  }

  /**
  * Set this circle as the bounding circle of the given bounding square.
  *
  * @param boundingSquare - A bouding square from which extracting a bounding circle.
  */
  public ofSquare(boundingSquare: BoundingSquare): void {
    const width: number = boundingSquare.width
    const height: number = boundingSquare.height

    this.center.set(boundingSquare.centerX, boundingSquare.centerY)
    this._squaredRadius = (width * width + height * height) / 4.0
    this._radius = Math.sqrt(this._squaredRadius)
  }

  /**
  * @return The radius of this bounding circle.
  */
  public get radius(): number {
    return this._radius
  }

  /**
  * Update the radius of this bounding circle.
  *
  * @param radius - The new radius of this bounding circle.
  */
  public set radius(radius: number) {
    this._radius = radius
    this._squaredRadius = radius * radius
  }

  /**
  * @return The squared radius of this bounding circle.
  */
  public get squaredRadius(): number {
    return this._squaredRadius
  }

  /**
  * Update the center of this bounding circle.
  *
  * @param x - The center of this bounding circle in abscissa.
  * @param y - The center of this bounding circle in ordinates.
  */
  public setCenter(x: number, y: number): void {
    this.center.set(x, y)
  }

  /**
  * Update the radius of this bounding circle.
  *
  * @param radius - The new radius of this bounding circle.
  */
  public setRadius(radius: number): void {
    this.radius = radius
  }

  /**
  * @return True if this bounding circle contains the given center.
  */
  public contains(x: number, y: number): boolean {
    const dx: number = x - this.center.x
    const dy: number = y - this.center.y

    return dx * dx + dy * dy < this._squaredRadius
  }

  /**
  * Reset this component instance to its initial state.
  */
  public clear() {
    this.center.clear()
    this._radius = 1
    this._squaredRadius = 1
  }

  /**
  * Copy another instance of this component.
  *
  * @param other - Other instance to copy.
  */
  public copy(other: BoundingCircle): void {
    this.center.copy(other.center)
    this._radius = other.radius
    this._squaredRadius = other.radius * other.radius
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof BoundingCircle) {
      return (
        other.center.equals(this.center) &&
        other._radius === this._radius
      )
    }

    return false
  }
}
