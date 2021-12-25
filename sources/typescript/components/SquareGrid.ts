import { Vector2f, Vector4f } from '@cedric-demongivert/gl-tool-math'

/**
 * 
 */
export class SquareGrid {
  /**
  * Unit of the grid, eg. the width and height of a cell of the grid in world unit.
  */
  public readonly unit: Vector2f

  /**
  * RGBA color of the grid.
  */
  public readonly color: Vector4f

  /**
  * Thickness of the grid in pixels.
  */
  public thickness: number

  /**
  * Base of the grid, eg. the number of cells required in order to make one cell of a grid of higher order.
  */
  public base: number

  /**
  * Create a new unitary grid.
  */
  public constructor() {
    this.unit = new Vector2f()
    this.unit.set(1, 1)
    this.thickness = 1
    this.base = 10
    this.color = new Vector4f()
    this.color.set(0, 0, 0, 1)
  }

  /**
   * 
   */
  public setBase(base: number): void {
    this.base = base
  }

  /**
   * 
   */
  public setThickness(thickness: number): void {
    this.thickness = thickness
  }

  /**
   * 
   */
  public setUnit(x: number, y: number): void {
    this.unit.set(x, y)
  }

  /**
   * 
   */
  public setColor(r: number, g: number, b: number, a: number): void {
    this.color.set(r, g, b, a)
  }

  /**
  * Reset this component instance to its initial state.
  */
  public clear() {
    this.unit.set(1, 1)
    this.thickness = 1
    this.base = 10
    this.color.set(0, 0, 0, 1)
  }

  /**
  * Copy another instance of this component.
  *
  * @param other - Other instance to copy.
  */
  public copy(other: SquareGrid): void {
    this.unit.copy(other.unit)
    this.thickness = other.thickness
    this.base = other.base
    this.color.copy(other.color)
  }

  /**
   * 
   */
  public equals(other: any, tolerance: number = 0): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof SquareGrid) {
      return (
        other.unit.equals(this.unit, tolerance) &&
        other.color.equals(this.color, tolerance) &&
        other.thickness === this.thickness &&
        other.base === this.base
      )
    }

    return false
  }
}
