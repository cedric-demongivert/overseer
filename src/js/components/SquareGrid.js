import { SquareGrid as Data } from '../data/SquareGrid'

export const SquareGrid = {
  name: 'Square Grid',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new Data()
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
