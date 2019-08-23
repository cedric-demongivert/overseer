import { Vector2f, Vector4f } from '@cedric-demongivert/gl-tool-math'

export class SquareGrid {
  /**
  * Create a new unitary grid.
  */
  constructor () {
    this._unit = new Vector2f()
    this._unit.set(1, 1)
    this._thickness = 1
    this._color = new Vector4f()
    this._color.set(0, 0, 0, 1)
    this._layer = 0
  }

  /**
  * Reset this component instance to its initial state.
  */
  reset () {
    this._unit.set(1, 1)
    this._thickness = 1
    this._color.set(0, 0, 0, 1)
    this._layer = 0
  }

  /**
  * Copy another instance of this component.
  *
  * @param {Grid} other - Other instance to copy.
  */
  copy (other) {
    this._unit.copy(other.unit)
    this._thickness = other.thickness
    this._color.copy(other.color)
    this._layer = other.layer
  }

  get unit () {
    return this._unit
  }

  set unit (value) {
    this._unit.copy(value)
  }

  setUnit (x, y) {
    this._unit.set(x, y)
  }

  get thickness () {
    return this._thickness
  }

  set thickness (value) {
    this._thickness = value
  }

  get color () {
    return this._color
  }

  set color (value) {
    this._color.copy(value)
  }

  setColor (r, g, b, a) {
    this._color.set(r, g, b, a)
  }

  get layer () {
    return this._layer
  }

  set layer (value) {
    this._layer = value
  }
}
