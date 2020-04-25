import { Matrix4f, Vector4f } from '@cedric-demongivert/gl-tool-math'

import { Length } from './Length'

export class Unit {
  public readonly length : Length

  /**
  * @see Component#initialize
  */
  public constructor () {
    this.length = new Length('1m')
  }

  /**
  * Reset this component instance to its initial state.
  */
  public clear () : void {
    this.length.set('1m')
  }

  /**
  * Copy another instance of unit.
  *
  * @param toCopy - Other instance to copy.
  */
  public copy (toCopy : Unit) : void {
    this.length.set(toCopy.length)
  }

  /**
  * Apply this unit to the given matrix.
  *
  * @param sourceUnit - Unit of the matrix to scale.
  * @param sourceMatrix - A matrix to scale.
  */
  public apply (sourceUnit : Unit, sourceMatrix : Matrix4f) : void {
    this.applyToMatrix(sourceUnit, sourceMatrix)
  }

  /**
  * Apply this unit to the given matrix.
  *
  * @param sourceUnit - Unit of the matrix to scale.
  * @param sourceMatrix - A matrix to scale.
  */
  public applyToMatrix (sourceUnit : Unit, sourceMatrix : Matrix4f) : void {
    const si : number = sourceUnit.length.in(this.length.unit) / this.length.value

    sourceMatrix.multiplyWithStaticMatrixAsRightOperand(
      si,  0, 0, 0,
       0, si, 0, 0,
       0,  0, 1, 0,
       0,  0, 0, 1
    )
  }

  /**
  * Apply this unit to the given vector.
  *
  * @param sourceUnit - Unit of the vector to scale.
  * @param target - A vector to scale.
  */
  public applyToVector (sourceUnit : Unit, sourceVector : Vector4f) : void {
    const si : number = sourceUnit.length.in(this.length.unit) / this.length.value

    sourceVector.set(
      sourceVector.x * si,
      sourceVector.y * si,
      sourceVector.z,
      sourceVector.w
    )
  }
}
