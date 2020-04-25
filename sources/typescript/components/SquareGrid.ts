import { Vector2f, Vector4f } from '@cedric-demongivert/gl-tool-math'

export class SquareGrid {
  public readonly unit  : Vector2f
  public readonly color : Vector4f
  public thickness      : number
  public layer          : number

  /**
  * Create a new unitary grid.
  */
  public constructor () {
    this.unit = new Vector2f()
    this.unit.set(1, 1)
    this.thickness = 1
    this.color = new Vector4f()
    this.color.set(0, 0, 0, 1)
    this.layer = 0
  }

  /**
  * Reset this component instance to its initial state.
  */
  public clear () {
    this.unit.set(1, 1)
    this.thickness = 1
    this.color.set(0, 0, 0, 1)
    this.layer = 0
  }

  /**
  * Copy another instance of this component.
  *
  * @param other - Other instance to copy.
  */
  public copy (other : SquareGrid) : void {
    this.unit.copy(other.unit)
    this.thickness = other.thickness
    this.color.copy(other.color)
    this.layer = other.layer
  }

  public setUnit (x : number, y : number) : void {
    this.unit.set(x, y)
  }

  public setColor (r : number, g : number, b : number, a : number) : void {
    this.color.set(r, g, b, a)
  }
}
