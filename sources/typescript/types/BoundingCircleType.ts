import { BoundingCircle } from '../components/BoundingCircle'

import { OverseerComponentType } from './OverseerComponentType'

export const BoundingCircleType : OverseerComponentType<BoundingCircle> = {
  name: 'Bounding Circle',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : BoundingCircle {
    return new BoundingCircle()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : BoundingCircle, target : BoundingCircle) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : BoundingCircle) : void {
    instance.clear()
  }
}
