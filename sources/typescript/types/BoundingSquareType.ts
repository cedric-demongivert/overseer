import { BoundingSquare } from '../components/BoundingSquare'

import { OverseerComponentType } from './OverseerComponentType'

export const BoundingSquareType: OverseerComponentType<BoundingSquare> = {
  /**
   * @see OverseerComponentType.name
   */
  name: 'Bounding Square',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate(): BoundingSquare {
    return new BoundingSquare()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy(origin: BoundingSquare, target: BoundingSquare): void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear(instance: BoundingSquare): void {
    instance.clear()
  }
}
