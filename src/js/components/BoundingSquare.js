import { BoundingSquare as Data } from '../data/BoundingSquare'

export const BoundingSquare = {
  name: 'Bounding Square',

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
