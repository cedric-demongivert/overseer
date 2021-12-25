import { Draggable } from '../components/Draggable'
import { OverseerComponentType } from './OverseerComponentType'

export const DraggableType: OverseerComponentType<Draggable> = {
  /**
   * @see OverseerComponentType.name
   */
  name: 'Draggable',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate(): Draggable {
    return new Draggable()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy(origin: Draggable, target: Draggable): void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear(instance: Draggable): void {
    instance.clear()
  }
}
