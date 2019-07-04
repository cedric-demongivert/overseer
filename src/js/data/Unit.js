import { Matrix3f, Vector2f } from '@cedric-demongivert/gl-tool-math'
import { Length } from './Length'

export class Unit {
  /**
  * @see Component#initialize
  */
  constructor () {
    this._unit = new Length('1m')
  }

  /**
  * Reset this component instance to its initial state.
  */
  reset () {
    this._unit.set('1m')
  }

  /**
  * Copy another instance of unit.
  *
  * @param {Unit} other - Other instance to copy.
  */
  copy (other) {
    this._unit.set(other.unit)
  }

  /**
  * Apply this unit to the given matrix.
  *
  * @param {Unit} unit - Base unit of the matrix to scale.
  * @param {Matrix4f} target - A matrix to scale.
  */
  apply (unit, target) {
    const si = unit.unit.in(this._unit.unit) / this._unit.value

    target.multiplyWithStaticMatrixAsRightOperand(
      si,  0, 0, 0,
       0, si, 0, 0,
       0,  0, 1, 0,
       0,  0, 0, 1
    )
  }

  /**
  * @return {Length} The current unit of this entity.
  */
  get unit () {
    return this._unit
  }

  /**
  * @return {Length} The current unit of this entity.
  */
  get () {
    return this._unit
  }

  /**
  * Change the unit of this entity.
  *
  * @param {Length} value - The new unit of this entity.
  */
  set unit (value) {
    this.setUnit(value)
  }

  /**
  * Change the unit of this entity.
  *
  * @param {Length} value - The new unit of this entity.
  */
  set (value) {
    this._unit.set(value)
  }
}
