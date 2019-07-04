import { Mesh as MeshData } from '../data/Mesh'

export const Mesh = {
  name: 'Mesh',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new MeshData()
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
