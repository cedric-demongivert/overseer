import {
  FaceBuffer as GLToolFaceBuffer,
  BufferUsage
} from '@cedric-demongivert/gl-tool-buffer'

export const FaceBuffer = {
  name: 'Face Buffer',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new GLToolFaceBuffer()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin, target) {
    target.clear()
    target.capacity = origin.capacity
    target.usage = origin.usage

    for (let face = 0, size = origin.size; face < size; ++face) {
      target.push(
        origin.getVertex(face, 0),
        origin.getVertex(face, 1),
        origin.getVertex(face, 2)
      )
    }
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    instance.clear()
    instance.capacity = 16
    instance.usage = BufferUsage.STATIC_DRAW
    return instance
  }
}
