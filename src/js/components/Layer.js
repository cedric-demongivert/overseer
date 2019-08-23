import { Layer as LayerImplementation } from '../data/Layer'

export const Layer = {
  name: 'Layer',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new LayerImplementation()
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
