import { Unit } from '../components/Unit'
import { OverseerComponentType } from './OverseerComponentType'

export const UnitType: OverseerComponentType<Unit> = {
  /**
   * @see OverseerComponentType.name
   */
  name: 'Unit',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate(): Unit {
    return new Unit()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy(origin: Unit, target: Unit): void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear(instance: Unit): void {
    instance.clear()
  }
}
