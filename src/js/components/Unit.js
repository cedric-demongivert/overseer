import { Unit as UnitData } from '../data/Unit'

export const Unit = {
  name: 'Unit',

  DEFAULT: new UnitData(),

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new UnitData()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin, target) {
    target.copy(origin)
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    instance.reset()
  }
}
