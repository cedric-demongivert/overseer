import { Hierarchy } from '../components/Hierarchy'
import { OverseerComponentType } from './OverseerComponentType'

export const HierarchyType: OverseerComponentType<Hierarchy> = {
  /**
   * @see OverseerComponentType.name
   */
  name: 'Hierarchy',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate(): Hierarchy {
    return new Hierarchy()
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear(instance: Hierarchy): void {
    instance.clear()
  }
}
