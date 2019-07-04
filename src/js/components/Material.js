import { Material as MaterialData } from '../data/Material'

export const Material = {
  name: 'Material',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new MaterialData()
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
