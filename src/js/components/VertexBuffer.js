import { VertexBuffer as VertexBufferData } from '../data/VertexBuffer'

export const VertexBuffer = {
  name: 'Vertex Buffer',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new VertexBufferData()
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
