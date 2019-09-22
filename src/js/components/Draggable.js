import { Draggable as Data } from '../data/Draggable'

export const Draggable = {
  name: 'Draggable',

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
