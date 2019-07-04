import { Viewport as ViewportData } from '../data/Viewport'

export const Viewport = {
  name: 'Viewport',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new ViewportData()
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
