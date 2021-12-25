import { Matrix4f, Vector2f } from '@cedric-demongivert/gl-tool-math'

/**
 * 
 */
export class Transformation2D {
  /**
   * 
   */
  public readonly location: Vector2f

  /**
   * 
   */
  public readonly size: Vector2f

  /**
   * 
   */
  public rotation: number

  /**
  * Create a new identity transformation.
  */
  public constructor() {
    this.size = new Vector2f().set(1, 1)
    this.rotation = 0
    this.location = new Vector2f()
  }

  /**
  * Apply this transformation to the given matrix.
  *
  * @param target - Target matrix to transform.
  */
  public transform(target: Matrix4f): void {
    const sx: number = this.size.x
    const sy: number = this.size.y
    const tx: number = this.location.x
    const ty: number = this.location.y
    const cos: number = Math.cos(this.rotation)
    const sin: number = Math.sin(this.rotation)

    target.multiplyWithStaticMatrixAsLeftOperand(
      cos, -sin, 0, 0,
      sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ).multiplyWithStaticMatrixAsLeftOperand(
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ).multiplyWithStaticMatrixAsLeftOperand(
      1, 0, 0, tx,
      0, 1, 0, ty,
      0, 0, 1, 0,
      0, 0, 0, 1
    )
  }

  /**
  * Apply the inverse transformation to the given matrix.
  *
  * @param target - Target matrix to transform.
  */
  public invert(target: Matrix4f): void {
    const sx: number = 1 / this.size.x
    const sy: number = 1 / this.size.y
    const tx: number = -this.location.x
    const ty: number = -this.location.y
    const cos: number = Math.cos(-this.rotation)
    const sin: number = Math.sin(-this.rotation)

    target.multiplyWithStaticMatrixAsRightOperand(
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ).multiplyWithStaticMatrixAsRightOperand(
      cos, -sin, 0, 0,
      sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ).multiplyWithStaticMatrixAsRightOperand(
      1, 0, 0, tx,
      0, 1, 0, ty,
      0, 0, 1, 0,
      0, 0, 0, 1
    )
  }

  /**
  * Scale this object.
  *
  * @param width - The width scale factor.
  * @param height - The height scale factor.
  */
  public scale(width: number, height: number): void {
    this.size.set(this.size.x * width, this.size.y * height)
  }

  /**
  * Translate this object.
  *
  * @param x - The x component value of the translation.
  * @param y - The y component value of the translation.
  */
  public translate(x: number, y: number): void {
    this.location.set(
      this.location.x + x,
      this.location.y + y
    )
  }

  /**
  * Rotate this object.
  *
  * @param theta - The rotation angle to use in radians.
  */
  public rotate(theta: number): void {
    this.rotation += theta
  }

  /**
  * Reset this component to its initial state.
  */
  public clear(): void {
    this.size.set(1, 1)
    this.rotation = 0
    this.location.set(0, 0)
  }

  /**
  * Copy another 2d transformation.
  *
  * @param toCopy - Another 2D transformation.
  */
  public copy(toCopy: Transformation2D): void {
    this.size.copy(toCopy.size)
    this.rotation = toCopy.rotation
    this.location.copy(toCopy.location)
  }

  /**
   * 
   */
  public equals(other: any, tolerance: number = 0): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Transformation2D) {
      return (
        other.size.equals(this.size, tolerance) &&
        other.location.equals(this.location, tolerance) &&
        Math.abs(other.rotation - this.rotation) < tolerance
      )
    }

    return false
  }
}
