import { SquareGrid } from '../components/SquareGrid'

import { OverseerComponentType } from './OverseerComponentType'

export const SquareGridType : OverseerComponentType<SquareGrid> = {
  name: 'Square Grid',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : SquareGrid {
    return new SquareGrid()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : SquareGrid, target : SquareGrid) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : SquareGrid) : void {
    instance.clear()
  }
}
